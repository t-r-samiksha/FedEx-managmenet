import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import DCAPerformance from '../pages/admin/DCAPerformance';
import UserManagement from '../pages/admin/UserManagement';
import ReportsAnalytics from '../pages/admin/Reports';
import AuditLog from '../pages/admin/AuditLog';
// import AIInsights from '../pages/admin/AIInsights'; // Ideally link this somewhere, maybe a tab in dashboard or report

// Ops Pages
import OpsDashboard from '../pages/ops/Dashboard';
import Assignments from '../pages/ops/Assignments';
import Alerts from '../pages/ops/Alerts';
import WorkflowSLA from '../pages/ops/WorkflowSLA';

// DCA Pages
import DCADashboard from '../pages/dca/Dashboard';
import MyCases from '../pages/dca/MyCases';
import MyPerformance from '../pages/dca/MyPerformance';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                <Route element={<MainLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/performance" element={<DCAPerformance />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                    <Route path="/admin/reports" element={<ReportsAnalytics />} />
                    <Route path="/admin/audit" element={<AuditLog />} />
                </Route>
            </Route>

            {/* Ops Routes */}
            <Route element={<PrivateRoute allowedRoles={['ops_manager']} />}>
                <Route element={<MainLayout />}>
                    <Route path="/ops" element={<OpsDashboard />} />
                    <Route path="/ops/assignments" element={<Assignments />} />
                    <Route path="/ops/alerts" element={<Alerts />} />
                    <Route path="/ops/workflow" element={<WorkflowSLA />} />
                </Route>
            </Route>

            {/* DCA Routes */}
            <Route element={<PrivateRoute allowedRoles={['dca_agent']} />}>
                <Route element={<MainLayout />}>
                    <Route path="/dca" element={<DCADashboard />} />
                    <Route path="/dca/cases" element={<MyCases />} />
                    <Route path="/dca/performance" element={<MyPerformance />} />
                </Route>
            </Route>

            {/* Default Redirection */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
