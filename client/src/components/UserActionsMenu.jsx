import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Button from './ui/Button';
import { MoreHorizontal, Eye, Edit, UserX, Activity, UserCheck } from 'lucide-react';
import { clsx } from 'clsx';

const UserActionsMenu = ({ onAction, user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleAction = (actionType) => {
        onAction(actionType, user);
        setIsOpen(false);
    };

    const updatePosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            // Dropdown is w-48 (12rem = 192px)
            const dropdownWidth = 192;
            setMenuPosition({
                top: rect.bottom + 8,
                left: rect.right - dropdownWidth,
            });
        }
    };

    useLayoutEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
        }
        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isOpen]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside both menu and button
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
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

    const isActive = user.status && user.status.toLowerCase() === 'active';

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <Button
                ref={buttonRef}
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
                        "origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999] animate-in fade-in zoom-in-95 duration-100"
                    )}
                    style={{
                        position: 'fixed',
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                        width: '12rem', // w-48
                    }}
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

                        {isActive ? (
                            <button
                                onClick={() => handleAction('deactivate')}
                                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-900"
                                role="menuitem"
                            >
                                <UserX className="mr-3 h-4 w-4 text-red-500" />
                                Deactivate User
                            </button>
                        ) : (
                            <button
                                onClick={() => handleAction('activate')}
                                className="flex w-full items-center px-4 py-2 text-sm text-green-600 hover:bg-green-50 hover:text-green-900"
                                role="menuitem"
                            >
                                <UserCheck className="mr-3 h-4 w-4 text-green-500" />
                                Activate User
                            </button>
                        )}

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
