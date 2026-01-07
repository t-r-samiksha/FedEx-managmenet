import React from 'react';
import Button from './ui/Button';
import { AlertTriangle } from 'lucide-react';

const DeactivateUserDialog = ({ user, isOpen, onClose, onConfirm }) => {
    if (!isOpen || !user) return null;

    const handleConfirm = () => {
        onConfirm(user.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Deactivate User</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Are you sure you want to deactivate <span className="font-medium text-gray-900">{user.name}</span>?
                        This action will restrict their access to the platform.
                    </p>

                    <div className="flex items-center justify-center gap-3">
                        <Button variant="outline" onClick={onClose} className="w-full">
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleConfirm} className="w-full">
                            Deactivate
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeactivateUserDialog;
