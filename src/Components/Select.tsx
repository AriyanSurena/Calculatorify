import { useId, useState } from "react";

interface SelectProps {
    id: string;
    list: string[];
    selected: string;
    setSelected: (selected: string) => void;
}

const Select: React.FC<SelectProps> = ({
    id,
    list,
    selected,
    setSelected,
}) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const selectId: string = id || useId();

    return (
        <section
            id={selectId}
            className="w-full shadow-2xl rounded select-none">
            {
                !isOpened &&
                <button
                    value={selected}
                    onClick={() => { setIsOpened(!isOpened) }}
                    className="flex justify-between w-full p-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-400 hover:to-blue-600 transition-all duration-200 dark:from-gray-700 dark:to-gray-800 dark:hover:to-gray-900 hover:scale-[1.01] transition-all duration-200 text-white"
                >
                    {selected}
                    <svg className="w-1/12 h-4">
                        <path
                            d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                            className="fill-white">
                        </path>
                    </svg>
                </button>
            }
            {
                isOpened ? (
                    <div
                        className="
                                w-full min-h-full max-h-[75vh] rounded bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 overflow-auto z-50 absolute top-0 left-0 overflow-y-auto
                                /* برای فایرفاکس */
                                scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100
                                /* برای کروم و سافاری */
                                [&::-webkit-scrollbar]:w-1
                                hover:[&::-webkit-scrollbar]:w-3
                                [&::-webkit-scrollbar-track]:bg-gray-100
                                [&::-webkit-scrollbar-track]:rounded-full
                                [&::-webkit-scrollbar-thumb]:bg-blue-500
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                hover:[&::-webkit-scrollbar-thumb]:bg-blue-600"
                    >
                        <ul
                            className="w-full flex flex-col gap-2 h-full p-2 z-50"
                            id={selectId + 'Items'}>
                            {
                                list.map((item) => {
                                    return (
                                        <li
                                            key={item}
                                            className="
                                                    w-full p-2 
                                                    rounded 
                                                    ring-1 ring-gray-300
                                                    bg-white
                                                    dark:bg-gray-900 
                                                    hover:bg-gray-100
                                                    dark:hover:bg-slate-900 
                                                    text-black dark:text-white 
                                                    dark:ring-gray-800 
                                                    hover:scale-[1.01]
                                                    hover:text-blue-400
                                                    transition-all 
                                                    duration-200 
                                                    cursor-pointer 
                                                    select-none
                                                "
                                            value={item}
                                            onClick={() => {
                                                if (setSelected)
                                                        setSelected(item)
                                                setIsOpened(!isOpened);
                                            }}>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                ) :
                    null
            }
        </section>
    )
}

export default Select;