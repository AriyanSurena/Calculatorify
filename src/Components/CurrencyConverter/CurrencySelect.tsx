import { useState, useRef, useEffect } from "react";

// تعریف تایپ برای ارز
export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

// پروپ‌های کامپوننت
interface CurrencySelectProps {
    id: string;
    currencies: Currency[];
    selectedCurrency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    title?: string;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
    id,
    currencies,
    selectedCurrency,
    onCurrencyChange,
    label,
    placeholder = "Select currency",
    className = "",
    disabled = false,
    title,
}) => {
    const [isOpened, setIsOpened] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // بستن dropdown وقتی بیرون کلیک می‌شود
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpened(false);
                setSearchTerm("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // فیلتر ارزها بر اساس جستجو
    const filteredCurrencies = currencies.filter(currency =>
        currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // انتخاب ارز
    const handleCurrencySelect = (currency: Currency) => {
        onCurrencyChange(currency);
        setIsOpened(false);
        setSearchTerm("");
    };

    // تابع toggle
    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpened(!isOpened);
            setSearchTerm("");
        }
    };

    return (
        <div 
            ref={dropdownRef}
            className={`relative w-full ${className}`}
            id={id}
            title={title}
        >
            {/* لیبل اختیاری */}
            {label && (
                <label 
                    htmlFor={`${id}-button`}
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                    {label}
                </label>
            )}

            {/* دکمه انتخاب */}
            <button
                id={`${id}-button`}
                type="button"
                onClick={toggleDropdown}
                disabled={disabled}
                className={`
                    flex justify-between items-center w-full p-2 rounded
                    bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-700 dark:to-gray-800 
                    hover:from-blue-600 hover:to-purple-700 dark:hover:from-gray-700 dark:hover:to-gray-900 hover:scale-[1.01]
                    transition-all duration-200 text-white shadow-md 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                aria-haspopup="listbox"
                aria-expanded={isOpened}
            >
                <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">
                        {selectedCurrency.code}
                    </span>
                    <span className="text-sm opacity-90 truncate max-w-[150px]">
                        {selectedCurrency.name}
                    </span>
                </div>
                
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpened ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path 
                        fillRule="evenodd" 
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                    />
                </svg>
            </button>

            {/* Dropdown لیست ارزها */}
            {isOpened && (
                <div 
                    className="
                        absolute top-full left-0 right-0 mt-1 z-50 
                        max-h-80 overflow-auto rounded-lg shadow-xl 
                        bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    "
                    role="listbox"
                    aria-labelledby={`${id}-button`}
                >
                    {/* جستجو */}
                    <div className="p-3 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="
                                w-full p-2 rounded border border-gray-300 dark:border-gray-600 
                                bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                            "
                            autoFocus
                            aria-label="Search currencies"
                        />
                    </div>

                    {/* لیست ارزها */}
                    <ul className="py-1">
                        {filteredCurrencies.length > 0 ? (
                            filteredCurrencies.map((currency) => (
                                <li
                                    key={currency.code}
                                    onClick={() => handleCurrencySelect(currency)}
                                    className={`
                                        flex justify-between items-center px-4 py-3 
                                        cursor-pointer transition-all duration-150 
                                        hover:bg-gray-100 dark:hover:bg-gray-700
                                        ${selectedCurrency.code === currency.code 
                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                                            : 'text-gray-800 dark:text-gray-200'
                                        }
                                    `}
                                    role="option"
                                    aria-selected={selectedCurrency.code === currency.code}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold">
                                            {currency.code}
                                        </span>
                                        <span className="truncate flex-1">
                                            {currency.name}
                                        </span>
                                    </div>
                                    <span className="text-lg font-medium ml-2">
                                        {currency.symbol}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">
                                No currencies found
                            </li>
                        )}
                    </ul>

                    {/* تعداد نتایج */}
                    {searchTerm && (
                        <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t dark:border-gray-700">
                            {filteredCurrencies.length} of {currencies.length} currencies
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CurrencySelect;