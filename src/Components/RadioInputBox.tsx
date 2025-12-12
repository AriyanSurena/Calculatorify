interface RadioInputBoxProps {
    name: string,
    labelText: string,
    labelTitle?: string,
    labelDescription?: string,
    id: string,
    value: string;
    checked?: boolean;
    onClickFn?: (value: string) => void,
}

const RadioInputBox: React.FC<RadioInputBoxProps> = ({
    labelText,
    labelTitle,
    labelDescription,
    id,
    name,
    value,
    checked,
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
            className="flex items-start gap-2 cursor-pointer select-none p-1 rounded bg-inherit transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-50">
            <input
                type="radio"
                name={name}
                id={id}
                value={value}
                className="peer w-6 h-6 rounded bg-slate-300 checked:bg-blue-500 transition-colors"
                checked={checked}
            />
            {
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        {
                            labelText
                                ? (
                                    labelText
                                )
                                : null
                        }
                    </div>
                    {
                        labelDescription
                            ?
                            <span className="text-xs leading-7 opacity-50">
                                {
                                    labelDescription
                                }
                            </span>
                            : null
                    }
                </div>
            }
        </label>
    )
}

export default RadioInputBox;