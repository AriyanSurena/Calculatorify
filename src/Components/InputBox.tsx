import { useId } from "react";
import Input from "./Input";
import Label from "./Label";

const InputBox: React.FC<{
    name: string,
    placeholder: string,
    label: string,
    title?: string,
    propValue?: number,
    id?: string,
    onClickFn?: () => void,
    onChangeFn?: (value: number) => void,
}> = ({
    name,
    placeholder,
    label,
    title,
    id,
    propValue,
    onClickFn,
    onChangeFn,
}) => {
        const handleChange = (value: string) => {
            if (onChangeFn) {
                const numValue = Number(value);
                onChangeFn(numValue);
            }
        };

        const handleClick = () => {
            if (onClickFn) {
                onClickFn();
            }
        };

        const uniqeId = (id ?? '') + useId()

        return (
            <Label
                htmlFor={uniqeId}
                label={label}
                title={title}
                onClick={handleClick}>
                <Input
                    id={uniqeId}
                    name={name}
                    propValue={propValue ? propValue : undefined}
                    placeholder={placeholder}
                    onChange={handleChange}
                    classes="w-full bg-slate-100 dark:bg-slate-600 rounded shadow p-2 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500 transition"
                />
            </Label>
        )
    }

export default InputBox;