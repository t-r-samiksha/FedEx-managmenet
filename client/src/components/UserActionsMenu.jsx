import React, { useState, useRef, useEffect } from 'react';
import Button from './ui/Button';
import { MoreHorizontal, Eye, Edit, UserX, Activity } from 'lucide-react';
import { clsx } from 'clsx';

const UserActionsMenu = ({ onAction, user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleAction = (actionType) => {
        onAction(actionType, user);
        setIsOpen(false);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Actions"
            >
                <MoreHorizontal className="h-4 w-4" />
            </Button>

            {isOpen && (
                <div
                    className={clsx(
                        "absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in zoom-in-95 duration-100"
                    )}
                >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                            onClick={() => handleAction('view')}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            <Eye className="mr-3 h-4 w-4 text-gray-500" />
                            View Details
                        </button>
                        <button
                            onClick={() => handleAction('edit')}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            <Edit className="mr-3 h-4 w-4 text-gray-500" />
                            Edit User
                        </button>
                        <button
                            onClick={() => handleAction('deactivate')}
                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-900"
                            role="menuitem"
                        >
                            <UserX className="mr-3 h-4 w-4 text-red-500" />
                            Deactivate User
                        </button>
                        <button
                            onClick={() => handleAction('activity')}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            <Activity className="mr-3 h-4 w-4 text-gray-500" />
                            View Activity
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserActionsMenu;
