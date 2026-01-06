import psycopg2
import uuid
from datetime import datetime, timedelta
import random

DB_CONFIG = {
    "host": "localhost",
    "port": 5432,
    "dbname": "fedex_dca",
    "user": "postgres",
    "password": "Almighty#92"
}

def uid():
    return str(uuid.uuid4())


conn = psycopg2.connect(**DB_CONFIG)
cur = conn.cursor()

try:
    # =========================
    # USERS
    # =========================
    users = {
        "admin": uid(),
        "ops": uid(),
        "agent": uid()
    }

    cur.execute("""
        INSERT INTO users (id,email,password_hash,name,role)
        VALUES
        (%s,'admin@fedex.com','HASHED','Admin User','admin'),
        (%s,'ops@fedex.com','HASHED','Operations Manager','ops_manager'),
        (%s,'agent@agency.com','HASHED','DCA Agent','dca_agent')
    """, (users["admin"], users["ops"], users["agent"]))

    # =========================
    # DCAS
    # =========================
    dcas = {
        "alpha": uid(),
        "beta": uid(),
        "gamma": uid()
    }

    cur.execute("""
        INSERT INTO dcas (id,name,region)
        VALUES
        (%s,'Alpha Recovery','India'),
        (%s,'Beta Collections','India'),
        (%s,'Gamma Solutions','India')
    """, tuple(dcas.values()))

    # =========================
    # CUSTOMERS
    # =========================
    customers = []
    for name, region, ctype in [
        ("Acme Logistics","South India","Business"),
        ("Nova Retail","West India","Enterprise"),
        ("Global Traders","North India","Business"),
        ("FastTrack Logistics","East India","Business")
    ]:
        cid = uid()
        customers.append(cid)
        cur.execute("""
            INSERT INTO customers (id,name,type,region)
            VALUES (%s,%s,%s,%s)
        """, (cid, name, ctype, region))

    # =========================
    # CASES + RELATED DATA
    # =========================
    for i in range(12):
        cust_id = random.choice(customers)
        amount = random.randint(5000, 900000)
        due_date = datetime.now().date() - timedelta(days=random.randint(15,120))
        status = random.choice(['New','Assigned','In Progress','PTP','Paid','Escalated'])

        # ---- CASE ----
        cur.execute("""
            INSERT INTO cases (customer_id,total_amount_due,due_date,status)
            VALUES (%s,%s,%s,%s)
            RETURNING id
        """, (cust_id, amount, due_date, status))

        case_id = cur.fetchone()[0]

        # ---- ASSIGNMENT ----
        if status != 'New':
            cur.execute("""
                INSERT INTO case_assignments
                (case_id,dca_id,assigned_by,assignment_type)
                VALUES (%s,%s,%s,%s)
            """, (
                case_id,
                random.choice(list(dcas.values())),
                users["ops"],
                random.choice(['auto','manual'])
            ))

        # ---- ACTIONS ----
        for _ in range(random.randint(1,4)):
            cur.execute("""
                INSERT INTO actions_log
                (case_id,action_type,actor_user_id,actor_role_snapshot)
                VALUES (%s,%s,%s,%s)
            """, (
                case_id,
                random.choice(['call','email','visit','ptp']),
                users["agent"],
                'dca_agent'
            ))

        # ---- PAYMENTS ----
        if status == 'Paid':
            cur.execute("""
                INSERT INTO payments
                (case_id,amount,payment_date)
                VALUES (%s,%s,%s)
            """, (
                case_id,
                amount,
                datetime.now().date()
            ))

        # ---- SLA ----
        cur.execute("""
            INSERT INTO sla_events
            (case_id,sla_type,deadline_at)
            VALUES (%s,'first_contact',%s)
        """, (
            case_id,
            datetime.now() + timedelta(hours=48)
        ))

        # ---- ML PREDICTION ----
        cur.execute("""
            INSERT INTO ml_predictions
            (case_id,recovery_probability,model_version)
            VALUES (%s,%s,'v1')
        """, (
            case_id,
            round(random.uniform(0.2,0.9),4)
        ))

        # ---- NOTES ----
        cur.execute("""
            INSERT INTO case_notes
            (case_id,note,created_by)
            VALUES (%s,%s,%s)
        """, (
            case_id,
            "Auto-generated seed note",
            users["ops"]
        ))

    # =========================
    # SLA POLICIES
    # =========================
    cur.execute("""
        INSERT INTO sla_policies
        (policy_key,value_minutes,updated_by)
        VALUES
        ('first_contact',2880,%s),
        ('follow_up',4320,%s)
    """, (users["admin"], users["admin"]))

    # =========================
    # ASSIGNMENT RULES
    # =========================
    cur.execute("""
        INSERT INTO assignment_rules
        (rule_key,enabled,updated_by)
        VALUES
        ('high_priority',true,%s),
        ('risk_escalation',true,%s)
    """, (users["admin"], users["admin"]))

    # =========================
    # AUDIT LOG
    # =========================
    cur.execute("""
        INSERT INTO audit_logs
        (actor_user_id,actor_role_snapshot,action_type,entity_type)
        VALUES (%s,'admin','DB_SEED','system')
    """, (users["admin"],))

    conn.commit()
    print("✅ DATABASE SEEDED SUCCESSFULLY")

except Exception as e:
    conn.rollback()
    print("❌ ERROR:", e)

finally:
    cur.close()
    conn.close()