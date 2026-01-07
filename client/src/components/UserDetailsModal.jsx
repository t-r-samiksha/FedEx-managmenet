import React from 'react';
import Badge from './ui/Badge';
import { X, User, Mail, Shield, Building, Power } from 'lucide-react';
import Button from './ui/Button';

const UserDetailsModal = ({ user, isOpen, onClose }) => {
    if (!isOpen || !user) return null;

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Offline': return 'secondary';
            case 'Inactive': return 'default';
            default: return 'outline';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* User Header */}
                    <div className="flex flex-col items-center justify-center text-center">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-20 w-20 rounded-full border-4 border-white shadow-md mb-3"
                        />
                        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="mt-2">
                            <Badge variant={getStatusVariant(user.status)}>{user.status}</Badge>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid gap-4 mt-6">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <User className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Full Name</p>
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <Mail className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Email Address</p>
                                <p className="text-sm font-medium text-gray-900">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <Shield className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Role</p>
                                <p className="text-sm font-medium text-gray-900 capitalize">{user.role.replace('_', ' ')}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <Building className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Organization</p>
                                <p className="text-sm font-medium text-gray-900">{user.organization || 'N/A'}</p>
                            </div>
                        </div>

                        {/* {user.lastActive && (
                             <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <Power className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Last Active</p>
                                    <p className="text-sm font-medium text-gray-900">{user.lastActive}</p>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end p-4 border-t bg-gray-50">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;
