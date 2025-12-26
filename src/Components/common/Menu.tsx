import { useState, useRef, useEffect } from "react";

interface MenuItem {
    key: string;
    label: string;
}

interface MenuProps {
    id: string;
    list: MenuItem[] | string[];
    selected: string;
    setSelected: (selected: string) => void;
}

const Menu: React.FC<MenuProps> = ({ id, list, selected, setSelected }) => {
    // تشخیص نوع لیست
    const isStringList = list.length > 0 && typeof list[0] === 'string';
    
    if (isStringList) {
        return <StringMenu id={id} list={list as string[]} selected={selected} setSelected={setSelected} />;
    }
    
    return <ObjectMenu id={id} list={list as MenuItem[]} selected={selected} setSelected={setSelected} />;
};

// کامپوننت برای لیست‌های رشته‌ای
const StringMenu: React.FC<{ 
    id: string; 
    list: string[]; 
    selected: string; 
    setSelected: (selected: string) => void; 
}> = ({ id, list, selected, setSelected }) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const menuRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpened(false);
            }
        };

        if (isOpened) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpened]);

    return (
        <section
            ref={menuRef}
            id={id}
            className="w-full shadow-2xl rounded select-none relative"
        >
            {/* دکمه نمایش انتخاب فعلی */}
            <button
                type="button"
                onClick={() => setIsOpened(!isOpened)}
                className="flex justify-between w-full p-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-400 hover:to-blue-600 transition-all duration-200 dark:from-gray-700 dark:to-gray-800 dark:hover:to-gray-900 hover:scale-[1.01] text-white"
            >
                <span className="truncate">{selected}</span>
                <svg 
                    className={`w-1/12 h-4 transition-transform duration-200 ${isOpened ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                        className="fill-white"
                    />
                </svg>
            </button>

            {/* لیست آیتم‌ها */}
            {isOpened && (
                <div
                    className="
                        w-full max-h-[75vh] rounded bg-gradient-to-r from-blue-100 to-purple-100 
                        dark:from-gray-800 dark:to-gray-900 overflow-auto z-50 absolute top-full left-0 
                        mt-1 shadow-lg overflow-y-auto
                        scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100
                        [&::-webkit-scrollbar]:w-1
                        hover:[&::-webkit-scrollbar]:w-3
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-blue-500
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        hover:[&::-webkit-scrollbar-thumb]:bg-blue-600
                    "
                >
                    <ul
                        className="w-full flex flex-col gap-2 p-2"
                        id={`${id}-items`}
                    >
                        {list.map((item) => (
                            <li
                                key={item}
                                className="
                                    w-full p-2 rounded ring-1 ring-gray-300
                                    bg-white dark:bg-gray-900 hover:bg-gray-100
                                    dark:hover:bg-slate-900 text-black dark:text-white
                                    dark:ring-gray-800 hover:scale-[1.01] hover:text-blue-400
                                    transition-all duration-200 cursor-pointer select-none
                                    truncate
                                "
                                onClick={() => {
                                    setSelected(item);
                                    setIsOpened(false);
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};

// کامپوننت برای لیست‌های آبجکتی
const ObjectMenu: React.FC<{ 
    id: string; 
    list: MenuItem[]; 
    selected: string; 
    setSelected: (selected: string) => void; 
}> = ({ id, list, selected, setSelected }) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const menuRef = useRef<HTMLElement>(null);
    
    // پیدا کردن label مربوط به selected key
    const selectedLabel = list.find(item => item.key === selected)?.label || selected;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpened(false);
            }
        };

        if (isOpened) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpened]);

    return (
        <section
            ref={menuRef}
            id={id}
            className="w-full shadow-2xl rounded select-none relative"
        >
            {/* دکمه نمایش انتخاب فعلی */}
            <button
                type="button"
                onClick={() => setIsOpened(!isOpened)}
                className="flex justify-between w-full p-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-400 hover:to-blue-600 transition-all duration-200 dark:from-gray-700 dark:to-gray-800 dark:hover:to-gray-900 hover:scale-[1.01] text-white"
            >
                <span className="truncate">{selectedLabel}</span>
                <svg 
                    className={`w-1/12 h-4 transition-transform duration-200 ${isOpened ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                        className="fill-white"
                    />
                </svg>
            </button>

            {/* لیست آیتم‌ها */}
            {isOpened && (
                <div
                    className="
                        w-full max-h-[75vh] rounded bg-gradient-to-r from-blue-100 to-purple-100 
                        dark:from-gray-800 dark:to-gray-900 overflow-auto z-50 absolute top-full left-0 
                        mt-1 shadow-lg overflow-y-auto
                        scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100
                        [&::-webkit-scrollbar]:w-1
                        hover:[&::-webkit-scrollbar]:w-3
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-blue-500
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        hover:[&::-webkit-scrollbar-thumb]:bg-blue-600
                    "
                >
                    <ul
                        className="w-full flex flex-col gap-2 p-2"
                        id={`${id}-items`}
                    >
                        {list.map((item) => (
                            <li
                                key={item.key}
                                className="
                                    w-full p-2 rounded ring-1 ring-gray-300
                                    bg-white dark:bg-gray-900 hover:bg-gray-100
                                    dark:hover:bg-slate-900 text-black dark:text-white
                                    dark:ring-gray-800 hover:scale-[1.01] hover:text-blue-400
                                    transition-all duration-200 cursor-pointer select-none
                                    truncate
                                "
                                onClick={() => {
                                    setSelected(item.key);
                                    setIsOpened(false);
                                }}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};

export default Menu;