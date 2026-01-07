import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { X } from 'lucide-react';

const ROLES = [
    { value: 'admin', label: 'Admin' },
    { value: 'ops_manager', label: 'Ops Manager' },
    { value: 'dca_agent', label: 'DCA Agent' },
    { value: 'viewer', label: 'Viewer' },
];

const EditUserModal = ({ user, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        role: '',
        organization: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                role: user.role,
                organization: user.organization || ''
            });
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...user,
            ...formData,
            // If role is NOT DCA Agent, clear organization
            organization: formData.role === 'dca_agent' ? formData.organization : ''
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <Input
                                value={user.name}
                                disabled
                                className="bg-gray-100 text-gray-500 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {ROLES.map((role) => (
                                    <option key={role.value} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Organization
                            </label>
                            <Input
                                value={formData.organization}
                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                disabled={formData.role !== 'dca_agent'}
                                placeholder={formData.role !== 'dca_agent' ? 'Only for DCA Agents' : 'Enter organization'}
                                className={formData.role !== 'dca_agent' ? 'bg-gray-100 text-gray-500' : ''}
                            />
                            {formData.role !== 'dca_agent' && (
                                <p className="mt-1 text-xs text-gray-500">
                                    Organization field is only available for DCA Agents.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
