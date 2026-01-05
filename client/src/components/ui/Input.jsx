import React from 'react';
import { twMerge } from 'tailwind-merge';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={twMerge(
                'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = 'Input';

export default Input;
