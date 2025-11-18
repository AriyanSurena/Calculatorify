import Input from "../Converter/Input";
import TitleChip from "../TitleChip";

const InputBox: React.FC<{
    name: string,
    labelText: string,
    labelTitle?: string,
    id: string,
    placeholder: string,
    onClickFn?: () => void,
    onChangeFn?: (value: number) => void
}> = ({
    labelText,
    labelTitle,
    id,
    name,
    placeholder,
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

        return (
            <label
                htmlFor={name}
                title={labelTitle}
                onClick={handleClick}
                className="flex flex-col gap-2 cursor-pointer select-none">
                {
                    labelText ? (
                        <TitleChip>
                            {labelText}
                        </TitleChip>
                    ) : null
                }
                <Input 
                    id={id} 
                    name={name} 
                    placeholder={placeholder} 
                    onChange={handleChange}
                    classes="w-full bg-slate-100 dark:bg-slate-600 rounded shadow p-2 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500 transition"
                />
            </label>
        )
    }

export default InputBox;