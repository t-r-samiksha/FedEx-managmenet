import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
        secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-sm',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-text-primary',
        ghost: 'hover:bg-gray-100 text-text-primary',
        danger: 'bg-critical text-white hover:bg-critical/90 shadow-sm',
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2 text-sm',
        lg: 'h-12 px-8 text-base',
    };

    return (
        <button
            ref={ref}
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        />
    );
});

Button.displayName = 'Button';

export default Button;
