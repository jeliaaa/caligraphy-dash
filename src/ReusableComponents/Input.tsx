import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, value, ...rest }, ref) => {
        return (
            <div>
                <label className="text-lg font-medium text-gray-900">
                    <span className="text-base">{label}</span>
                </label>
                <input
                    ref={ref}
                    value={value || ''} // Ensure value is always defined or fallback to empty string
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-md text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...rest}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;