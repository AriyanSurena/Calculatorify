import { useEffect, useState } from "react";


interface ExchangeRates {
    [key: string]: number
}

const useExchangeRate = (baseCurrency: string = 'USD') => {
    const [rates, setRates] = useState<ExchangeRates>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
                );
                
                if (!response.ok) throw new Error('Failed to fetch rates');
                
                const data = await response.json();
                setRates(data.rates);
                setError(null);
            } catch (err) {
                setError('خطا در دریافت نرخ ارز');
                console.error('Error fetching exchange rates:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
        const interval = setInterval(fetchRates, 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, [baseCurrency]);

    return { rates, loading, error };
};

export default useExchangeRate