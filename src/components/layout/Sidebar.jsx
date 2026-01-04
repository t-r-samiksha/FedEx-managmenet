import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import { ... } from 'react-icons/rx'; // Removed unused imports
import {
    LayoutDashboard,
    Users,
    FileText,
    AlertTriangle,
    BarChart3,
    Briefcase,
    History,
    ShieldCheck,
    UserCog
} from 'lucide-react';
import { clsx } from 'clsx';

const Sidebar = () => {
    const { user } = useAuth();

    if (!user) return null;

    const getLinks = (role) => {
        switch (role) {
            case 'admin':
                return [
                    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
                    { name: 'DCA Performance', path: '/admin/performance', icon: BarChart3 },
                    { name: 'User Management', path: '/admin/users', icon: Users },
                    { name: 'Reports', path: '/admin/reports', icon: FileText },
                    { name: 'Audit Log', path: '/admin/audit', icon: ShieldCheck },
                ];
            case 'ops_manager':
                return [
                    { name: 'Ops Dashboard', path: '/ops', icon: LayoutDashboard },
                    { name: 'Assignments', path: '/ops/assignments', icon: UserCog },
                    { name: 'Alerts', path: '/ops/alerts', icon: AlertTriangle },
                    { name: 'SLA Workflow', path: '/ops/workflow', icon: History },
                ];
            case 'dca_agent':
                return [
                    { name: 'My Dashboard', path: '/dca', icon: LayoutDashboard },
                    { name: 'My Cases', path: '/dca/cases', icon: Briefcase },
                    { name: 'My Performance', path: '/dca/performance', icon: BarChart3 },
                ];
            default:
                return [];
        }
    };

    const links = getLinks(user.role);

    return (
        <div className="flex w-64 flex-col bg-white border-r border-gray-200 shadow-sm">
            <div className="flex h-16 items-center px-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <div className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-lg">F</div>
                    <span>FedEx DCA</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Menu
                </div>
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path.split('/').length === 2 && user.role !== 'admin'} // simple exact match check logic
                            className={({ isActive }) =>
                                clsx(
                                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                )
                            }
                        >
                            <Icon className="h-5 w-5" />
                            {link.name}
                        </NavLink>
                    );
                })}
            </div>

            <div className="border-t border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full border border-gray-200"
                    />
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="truncate text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
