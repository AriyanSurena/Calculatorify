import React, { useEffect, useState } from 'react';
import type { ShapeInputProps } from './shapes.types';



const ShapeInput: React.FC<ShapeInputProps> = ({
    shape,
    param,
    label = shape,
    placeholder,
    onChange,
    value: propValue, // initial Value From props
}) => {
    const id = `${shape.toLowerCase()}-input`;
    const [localValue, setLocalValue] = useState<string>('');

    // sync with prop (only in controlled component)
    useEffect(() => {
        if (propValue !== undefined) {
            setLocalValue(propValue.toString());
        }
    }, [propValue]);

    // send changes to parent
    useEffect(() => {
        onChange({ shape, [param]: localValue });
    }, [localValue, shape, param, onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // 20 character limit
        if (inputValue.length > 20) {
            return;
        }

        // only integer and dot allowed:
        if (/^\d*\.?\d*$/.test(inputValue) || inputValue === '') {
            setLocalValue(inputValue);
        }
    };

    return (
        <label
            htmlFor={id}
            className="flex flex-col gap-2">
            {label}
            <input
                id={id}
                name={`${shape}-input`}
                placeholder={placeholder}
                value={localValue}
                onChange={handleChange}
                type="text"
                inputMode="decimal"
                className="w-full bg-slate-100 dark:bg-slate-600 rounded shadow p-2 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500 transition"
            />
        </label>
    );
};

export default ShapeInput;