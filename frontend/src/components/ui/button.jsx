// src/components/ui/button.jsx
import React from "react";
import clsx from "clsx";

const baseStyles = "inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
    default: "bg-blue-600 text-white border-transparent hover:bg-blue-700 focus:ring-blue-500",
    outline: "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-blue-500",
    destructive: "bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500",
};

export function Button({ variant = "default", className, children, ...props }) {
    return (
        <button
            className={clsx(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
}
