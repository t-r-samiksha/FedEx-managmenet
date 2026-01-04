import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={twMerge('rounded-lg border border-gray-200 bg-card text-text-primary shadow-sm', className)}
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';

export const CardHeader = ({ className, ...props }) => (
    <div className={twMerge('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
    <h3 className={twMerge('font-semibold leading-none tracking-tight', className)} {...props} />
);

export const CardContent = ({ className, ...props }) => (
    <div className={twMerge('p-6 pt-0', className)} {...props} />
);

export default Card;
