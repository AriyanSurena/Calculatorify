import useToast from "../../hooks/useToast";

interface ResultDisplayProps {
    result: string | number;
    label?: string;
    placeholder?: string;
    toastMessage?: string;
}
type ResultDisplayType = React.FC<ResultDisplayProps>;

type handleCopyProps = (value: string | number) => void;
const ResultDisplay: ResultDisplayType = ({
    placeholder = 'Result',
    label,
    result,
    toastMessage,
}) => {
    const formattedResult = new Intl.NumberFormat().format(Number(result));
    const { setToast } = useToast()
    const handleCopy: handleCopyProps = (value) => {
        const stringValue = String(value).trim();
        if (!stringValue || stringValue === "0" || stringValue === "NaN") {
            return;
        }
        try {
            navigator.clipboard.writeText(stringValue);
            setToast({
                type: 'success',
                duration: 2000,
                message: toastMessage ?? 'Content '
            })
        } catch {
            setToast({
                type: 'error',
                duration: 2000,
                message: toastMessage ?? 'The copy process failed.'
            })
        }
    }

    return (
        <section
            className={`
                flex flex-col gap-2 
                w-full p-2 my-2 
                text-center 
                bg-slate-100 dark:bg-slate-600 
                hover:opacity-90
                transition-all
                duration-300
                cursor-pointer 
                rounded shadow 
                ring-1 ring-slate-200 dark:ring-slate-700 
                overflow-hidden 
                ${(!result || typeof result === 'number' && result <= 0) && "opacity-50 select-none cursor-auto hover:scale-[unset]"}
            `}
            onClick={
                () => handleCopy(formattedResult)
            }
            title={
                result ? `Copy ${formattedResult}` : ''
            }>
            {
                label
                    ? (
                        <span className="w-full text-center p-2 rounded bg-white dark:bg-slate-700 text-black dark:text-white select-none">
                            {label}
                        </span>
                    )
                    : null
            }
            {
                result && !isNaN(result as number)
                    ?
                    (
                        <span className="block w-full my-2 h-max [overflow-wrap:anywhere]">
                            {formattedResult}
                        </span>
                    )
                    :
                    (placeholder)
            }
        </section>
    )
}

export default ResultDisplay;