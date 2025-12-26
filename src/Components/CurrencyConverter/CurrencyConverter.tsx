import { useEffect, useState } from "react";
import En from "./languages/en.json";
import Fa from "./languages/fa.json";
import useExchangeRates from "../../context/useExchangeRates";
import { useLanguage } from "../../context/useLanguage";
import useToolConfig from "../../context/useContentConfig";
import InputBox from "../common/InputBox";
import ToolCard from "../common/ToolCard";
import CurrencySelect from "./CurrencySelect";
import ResultDisplay from "../common/ResultDisplay";
import TextChip from "../common/TextChlip";

type ContentType = typeof En;

const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState<number | undefined>()
    const [fromCurrency, setFromCurrency] = useState<{ name: string, code: string, symbol: string }>({ name: '', symbol: '', code: '' })
    const [toCurrency, setToCurrency] = useState<{ name: string, code: string, symbol: string }>({ name: '', symbol: '', code: '' })
    const { rates, loading, error } = useExchangeRates(fromCurrency.code)

    const { language } = useLanguage();
    const content: ContentType = useToolConfig<ContentType>(En, Fa)

    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        const currencies: typeof content.currencies = [];
        content?.currencies.map(currency => {
            currencies.push(currency)
        })
        setFromCurrency(currencies[0])
        setToCurrency(currencies[1])
    }, [])

    useEffect(() => {
        setConvertedAmount(rates[toCurrency.code] ? (amount ?? 0) * rates[toCurrency.code] : 0)
    }, [amount, fromCurrency, toCurrency])

    return (
        <ToolCard id="Currency_Converter">
            <InputBox
                id="amount"
                label={content?.labels?.amount}
                name="amount"
                placeholder={content?.placeholders?.amount}
                title={content?.tooltips?.amount}
                onChangeFn={
                    (v) => {
                        setAmount(v)
                    }
                }
            />

            {/* واحد ورودی */}

            <CurrencySelect
                id="fromCurrency"
                title={content?.tooltips?.fromCurrency}
                currencies={content?.currencies}
                onCurrencyChange={setFromCurrency}
                selectedCurrency={fromCurrency}
                label={content?.labels?.fromCurrency}
                placeholder={content?.placeholders?.selectCurrency}
            />

            {/* خروجی */}
            <CurrencySelect
                id="toCurrency"
                title={content?.tooltips?.toCurrency}
                currencies={content?.currencies}
                onCurrencyChange={setToCurrency}
                selectedCurrency={toCurrency}
                label={content?.labels?.toCurrency}
                placeholder={content?.placeholders?.selectCurrency}
            />


            {/* لودینگ */}
            {/* وضعیت لودینگ و خطا */}
            {loading && (
                <div className="text-center p-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-blue-600 dark:text-blue-400">
                        {content?.messages?.loading}
                    </p>
                </div>
            )}

            {error && (
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-red-600 dark:text-red-400">
                        {content?.messages?.error}
                    </p>
                </div>
            )}

            {/* نمایش نتیجه */}
            {!loading && !error && amount !== undefined && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg">
                    <div className="text-center mb-4">
                        <ResultDisplay result={convertedAmount.toLocaleString(language.includes('fa-IR') ? 'fa-IR' : 'en-US') || 0} label={content?.placeholders?.result} placeholder={content?.labels?.convertedAmount} />

                        <TextChip classes="my-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                            {content?.messages?.exchangeRateInfo
                                .replace("{fromCurrency}", fromCurrency?.name)
                                .replace("{rate}", rates[toCurrency?.code]?.toLocaleString(language.startsWith('fa') ? 'fa-IR' : 'en-US') || "0")
                                .replace("{toCurrency}", toCurrency?.name)}
                        </TextChip>

                        <TextChip classes="my-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                            {content?.messages?.conversionResult
                                .replace("{amount}", amount?.toLocaleString(language.includes('fa-IR') ? 'fa-IR' : 'en-US') || "0")
                                .replace("{fromCurrency}", fromCurrency?.name)
                                .replace("{convertedAmount}", convertedAmount?.toLocaleString(language.startsWith('fa') ? 'fa-IR' : 'en-US') || "0")
                                .replace("{toCurrency}", toCurrency?.name)}
                        </TextChip>


                    </div>
                </div>
            )}
        </ToolCard>
    )
}

export default CurrencyConverter;