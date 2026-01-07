-- ==========================
-- EXTENSIONS
-- ==========================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ==========================
-- USERS
-- ==========================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT CHECK (role IN ('admin','ops_manager','dca_agent','viewer')) NOT NULL,
    organization TEXT NULL,  
    avatar_url TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- DCAS
-- ==========================
CREATE TABLE IF NOT EXISTS dcas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    region TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- CUSTOMERS
-- ==========================
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('Individual','Business','Enterprise')),
    region TEXT,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- CASES
-- ==========================
CREATE TABLE IF NOT EXISTS cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    total_amount_due NUMERIC(12,2) NOT NULL,
    due_date DATE,
    status TEXT CHECK (
        status IN ('New','Assigned','In Progress','PTP','Paid','Unreachable','Escalated')
    ),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- PAYMENTS
-- ==========================
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id),
    amount NUMERIC(12,2),
    payment_date DATE,
    created_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- ACTIONS LOG
-- ==========================
CREATE TABLE IF NOT EXISTS actions_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id),
    action_type TEXT,
    actor_user_id UUID REFERENCES users(id),
    actor_role_snapshot TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- CASE ASSIGNMENTS
-- ==========================
CREATE TABLE IF NOT EXISTS case_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id),
    dca_id UUID REFERENCES dcas(id),
    assigned_by UUID REFERENCES users(id),
    assignment_type TEXT CHECK (assignment_type IN ('auto','manual')),
    assigned_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- SLA EVENTS
-- ==========================
CREATE TABLE IF NOT EXISTS sla_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id),
    sla_type TEXT,
    deadline_at TIMESTAMP,
    breached_at TIMESTAMP,
    resolved_at TIMESTAMP
);

-- ==========================
-- CASE NOTES
-- ==========================
CREATE TABLE IF NOT EXISTS case_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id),
    note TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- AUDIT LOGS
-- ==========================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID REFERENCES users(id),
    actor_role_snapshot TEXT,
    action_type TEXT,
    entity_type TEXT,
    entity_id TEXT,
    metadata JSONB,
    ip_address INET,
    created_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- ML PREDICTIONS
-- ==========================
CREATE TABLE IF NOT EXISTS ml_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id),
    recovery_probability NUMERIC(5,4),
    model_version TEXT,
    predicted_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- ML TRAINING SNAPSHOTS
-- ==========================
CREATE TABLE IF NOT EXISTS ml_training_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID,
    features JSONB,
    label BOOLEAN,
    created_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- SLA POLICIES
-- ==========================
CREATE TABLE IF NOT EXISTS sla_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_key TEXT UNIQUE,
    value_minutes INTEGER,
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- ASSIGNMENT RULES
-- ==========================
CREATE TABLE IF NOT EXISTS assignment_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_key TEXT UNIQUE,
    enabled BOOLEAN,
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT now()
);

-- ==========================
-- INDEXES (PERFORMANCE)
-- ==========================
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_customer ON cases(customer_id);
CREATE INDEX IF NOT EXISTS idx_actions_case ON actions_log(case_id);
CREATE INDEX IF NOT EXISTS idx_sla_case ON sla_events(case_id);
CREATE INDEX IF NOT EXISTS idx_ml_case ON ml_predictions(case_id);
