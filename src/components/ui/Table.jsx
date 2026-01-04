import React from 'react';
import { clsx } from 'clsx';

export const Table = React.forwardRef(({ className, children, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-lg border border-gray-200 shadow-sm">
        <table
            ref={ref}
            className={clsx('w-full caption-bottom text-sm text-left', className)}
            {...props}
        >
            {children}
        </table>
    </div>
));
Table.displayName = 'Table';

export const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
    <thead ref={ref} className={clsx('[&_tr]:border-b bg-gray-50/50', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={clsx('[&_tr:last-child]:border-0', className)}
        {...props}
    />
));
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={clsx(
            'border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-100',
            className
        )}
        {...props}
    />
));
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={clsx(
            'h-10 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0',
            className
        )}
        {...props}
    />
));
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={clsx('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
        {...props}
    />
));
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={clsx('mt-4 text-sm text-gray-500', className)}
        {...props}
    />
));
TableCaption.displayName = 'TableCaption';
