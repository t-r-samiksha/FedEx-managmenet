import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">FedEx DCA</h1>
                    <p className="text-gray-500 mt-2">Debt Collection Agency Platform</p>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
