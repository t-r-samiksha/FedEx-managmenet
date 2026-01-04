import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, LogOut, Menu } from 'lucide-react';
import Button from '../ui/Button';

const Header = () => {
    const { logout, user } = useAuth();

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm z-10">
            <div className="flex items-center gap-4">
                {/* Mobile menu trigger could go here */}
                <h2 className="text-lg font-semibold text-gray-900">
                    {window.location.pathname === '/admin' ? 'Dashboard' : 'Portal'}
                    {/* Simple dynamic title placeholder - ideally use Route metadata or Context */}
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-critical ring-2 ring-white"></span>
                </button>

                <div className="h-6 w-px bg-gray-200"></div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        if (confirm('Are you sure you want to logout?')) logout();
                    }}
                    className="text-gray-600 hover:text-critical"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </Button>
            </div>
        </header>
    );
};

export default Header;
