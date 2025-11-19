import { useEffect, useState } from "react";

interface InputProps {
    name: string;
    placeholder: string;
    onChange: (value: string) => void;
    id?: string;
    propValue?: number;
    disabled?: boolean;
    classes?: string;
}

const Input: React.FC<InputProps> = ({
    name,
    placeholder,
    onChange,
    id,
    propValue,
    disabled,
    classes
}) => {
    const [localValue, setLocalValue] = useState<string>('')

    // همگام‌سازی با prop (در صورت controlled component بودن)
    useEffect(() => {
        if (propValue !== undefined) {
            setLocalValue(propValue.toString());
        }
    }, [propValue]);

    // ارسال تغییرات به والد
    useEffect(() => {
        onChange(localValue);
    }, [localValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // محدودیت 30 کاراکتر
        if (inputValue.length > 30) {
            return;
        }

        // فقط اعداد، نقطه مجاز باشند
        if (/^\d*\.?\d*$/.test(inputValue) || inputValue === '') {
            setLocalValue(inputValue);
        }
    };

    return (
        <input
            id={id}
            name={name}
            placeholder={placeholder}
            value={localValue}
            disabled={disabled}
            onChange={handleChange}
            className={`w-full bg-slate-100 dark:bg-slate-600 hover:shadow-xl focus:ring-2 focus:ring-slate-900 rounded shadow p-2 ring-1 ring-slate-200 dark:ring-slate-700 transition-all duration-200 ${classes}`}
            type="text"
            inputMode="decimal"
        />
    )
}

export default Input;