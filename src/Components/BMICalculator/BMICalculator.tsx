import { useEffect, useMemo, useReducer, useState } from "react";
import ToolCard from "../ToolCard";
import en_US from "./languages/en.json";
import fa_IR from "./languages/fa.json";
import useContentConfig from "../../Context/useContentConfig";
import type { BMIHistoryType, BMIStateType, ContentType } from "./BMICalculator.types";
import { useLanguage } from "../../Context/useLanguage";
import DisplayBMI from "./DisplayBMI";
import DisplayBMIHistory from "./DisplayBMIHistory";
import { createReducer } from "./BMI Utils/createReducer.utils";
import BMIRange from "./RangeSlider";

/**
 * BMI calculation component.
 * @returns Component
 */
const BMICalculator: React.FC = () => {
    // The component content is initialized based on the system language or the user's selected language.
    const content = useContentConfig<ContentType>(en_US, fa_IR);

    // Get the language used by the component:
    const { language } = useLanguage();

    // BMI calculator function for useReducer hook
    const reducer = useMemo(() => createReducer(content), [content])

    // Initial value for initialState
    const initialState: () => BMIStateType = () => {
        const saved = localStorage.getItem("Calculatorify_BMI");
        if (saved) return (JSON.parse(saved))

        return {
            weight: undefined,
            height: undefined,
            category: undefined,
            message: undefined,
        }
    }

    // The overall state of the component that holds the data and updates it with useReducer:
    const [state, dispatch] = useReducer(reducer, initialState());

    // Get the user's BMI record from localStorage; 
    const [history, setHistory] = useState<BMIHistoryType[]>(() => {
        // return its value if it exists, or an empty array if it doesn't:
        const savedHistory = localStorage.getItem('BMI_History');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    // Calculate BMI live and quickly (with debounce) every time you change the input values ​​for weight and height:
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (state.weight && state.height)
                dispatch({ type: 'CALCULATE_BMI' })
        }, 100); // 100ms delay

        return () => clearTimeout(timeoutId);
    }, [state, content]);

    const handleValueChange = (type: "height" | "weight", value: number) => {
        if (type === "height") {
            dispatch({ type: "UPDATE", param: "height", value });
        } else {
            dispatch({ type: "UPDATE", param: "weight", value });
        }
    };

    return (
        <ToolCard
            id="BMI_Calculator"
            key={"BMI_Calculator"}>

            {/* User height input: */}
            <BMIRange content={content} onValueChange={handleValueChange} initialValues={state} />
            
            {/* Display BMI Calculate Result */}
            <DisplayBMI state={state} content={content} />

            {
                state.bmi ? (
                    <div className="flex gap-4">
                        <button
                            className="w-1/2 text-center p-2 bg-red-900/40 hover:bg-red-800/60 text-gray-100 hover:text-white 
                     rounded-lg border border-red-700/50 hover:border-red-600/70 
                     transition-all duration-200 hover:scale-105 active:scale-95"
                            onClick={() => {
                                setHistory([]);
                                localStorage.removeItem('BMI_History');
                                dispatch({ type: "RESET" })
                            }}
                        >
                            {content?.buttons?.reset}
                        </button>
                        <button
                            className="w-1/2 text-center p-2 bg-blue-900/40 hover:bg-blue-800/60 text-gray-100 hover:text-white 
                     rounded-lg border border-blue-700/50 hover:border-blue-600/70 
                     transition-all duration-200 hover:scale-105 active:scale-95"
                            onClick={() => {
                                if (state.bmi && state.weight && state.height && state.category) {
                                    // Check if this calculation is new (not already in history)
                                    const isNewCalculation = !history.some(item =>
                                        item.weight === state.weight &&
                                        item.height === state.height &&
                                        item.bmi === state.bmi
                                    );

                                    if (isNewCalculation) {
                                        const newEntry: BMIHistoryType = {
                                            id: Date.now(),
                                            date: new Date().toLocaleString(language, {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }),
                                            weight: state.weight!,
                                            height: state.height!,
                                            bmi: state.bmi,
                                            category: state.category,
                                            message: state.message
                                        };

                                        // Keep only last 10 entries
                                        const updatedHistory = [newEntry, ...history.slice(0, 9)];
                                        setHistory(updatedHistory);
                                        localStorage.setItem('BMI_History', JSON.stringify(updatedHistory));
                                    }
                                }
                            }}
                        >
                            {content?.buttons?.save}
                        </button>
                    </div>
                ) : null
            }

            {/* Display BMI Calculate History */}
            {
                history.length > 0 && <DisplayBMIHistory content={content} history={history} setHistory={setHistory} />
            }
        </ToolCard>
    )
}

export default BMICalculator;