interface RadioInputBoxProps {
    name: string,
    labelText: string,
    labelTitle?: string,
    id: string,
    value: string;
    onClickFn?: (value: string) => void,
}

const RadioInputBox: React.FC<RadioInputBoxProps> = ({
    labelText,
    labelTitle,
    id,
    name,
    value,
    onClickFn,
}) => {
    const handleClick = () => {
        if (onClickFn) {
            onClickFn(value);
        }
    };

    return (
        <label
            htmlFor={id}
            title={labelTitle}
            onClick={handleClick}
            className="flex items-center gap-2 cursor-pointer select-none p-1 rounded bg-inherit transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-50">
            <input 
                type="radio" 
                name={name}
                id={id}
                value={value}
                className="peer w-6 h-6 rounded bg-slate-300 checked:bg-blue-500 transition-colors"
            />
            {
                labelText ? (
                    <div>
                        {labelText}
                    </div>
                ) : null
            }
        </label>
    )
}

export default RadioInputBox;