import React from 'react';
import { twMerge } from 'tailwind-merge';

const Badge = ({ className, variant = 'default', children, ...props }) => {
    const variants = {
        default: 'bg-primary/10 text-primary hover:bg-primary/20',
        secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
        outline: 'text-text-primary border border-gray-300',
        success: 'bg-success/10 text-success hover:bg-success/20',
        warning: 'bg-warning/10 text-warning hover:bg-warning/20',
        critical: 'bg-critical/10 text-critical hover:bg-critical/20',
        gray: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    };

    return (
        <div className={twMerge('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent', variants[variant], className)} {...props}>
            {children}
        </div>
    );
};

export default Badge;
