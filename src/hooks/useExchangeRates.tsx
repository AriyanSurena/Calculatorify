import { useEffect, useState } from "react";

interface ExchangeRates {
    [key: string]: number;
}

const useExchangeRate = (baseCurrency: string = 'USD') => {
    const [rates, setRates] = useState<ExchangeRates>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<string>('');

    useEffect(() => {
        const fetchRates = async () => {
            try {
                setLoading(true);
                
                // گزینه ۱: exchangerate-api.com (1500 درخواست ماهانه رایگان)
                // const response = await fetch(
                //     `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
                // );
                
                // گزینه ۲: Frankfurter API (رایگان، بدون نیاز به API Key)
                const response = await fetch(
                    `https://api.frankfurter.app/latest?from=${baseCurrency}`
                );
                
                if (!response.ok) throw new Error('Failed to fetch exchange rates');
                
                const data = await response.json();
                
                // اضافه کردن ارز پایه با نرخ 1
                const allRates = {
                    [baseCurrency]: 1,
                    ...data.rates
                };
                
                setRates(allRates);
                setLastUpdate(data.date || new Date().toISOString().split('T')[0]);
                setError(null);
            } catch (err) {
                // در صورت خطا، از fallback rates استفاده کن
                console.error('Error fetching exchange rates:', err);
                
                // Fallback: استفاده از نرخ‌های آفلاین یا از localStorage
                const cachedRates = localStorage.getItem(`exchange_rates_${baseCurrency}`);
                if (cachedRates) {
                    const parsed = JSON.parse(cachedRates);
                    if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) { // کمتر از 24 ساعت
                        setRates(parsed.rates);
                        setError('Using cached rates (offline mode)');
                    } else {
                        setError('خطا در دریافت نرخ ارز. لطفاً اتصال اینترنت را بررسی کنید.');
                    }
                } else {
                    setError('خطا در دریافت نرخ ارز. لطفاً اتصال اینترنت را بررسی کنید.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
        
        // رفرش هر 10 دقیقه (برای نرخ‌های به‌روز)
        const interval = setInterval(fetchRates, 10 * 60 * 1000);
        return () => clearInterval(interval);
    }, [baseCurrency]);

    // ذخیره نرخ‌ها در localStorage
    useEffect(() => {
        if (Object.keys(rates).length > 0) {
            localStorage.setItem(`exchange_rates_${baseCurrency}`, JSON.stringify({
                rates,
                timestamp: Date.now()
            }));
        }
    }, [rates, baseCurrency]);

    return { rates, loading, error, lastUpdate };
};

export default useExchangeRate;