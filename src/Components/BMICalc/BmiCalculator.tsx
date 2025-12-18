import { useEffect, useReducer, useState } from "react";
import ResultDisplay from "../ResultDisplay";
import TextChip from "../TextChlip";
import InputBox from "../InputBox";
import ToolCard from "../ToolCard";
import en_US from "./languages/en.json";
import fa_IR from "./languages/fa.json";
import useContentConfig from "../../Context/useContentConfig";
import type { ActionType, BMIState, StateType } from "./BMICalculator.types";
import DynamicIcon from "../../SVGIcons/DynamicIcon";

/**
 * BMI calculation component.
 * @returns Component
 */
const BMICalculator: React.FC = () => {
    // The component content is initialized based on the system language or the user's selected language.
    const content = useContentConfig<typeof en_US>(en_US, fa_IR);


    // BMI calculator function for useReducer hook
    const reducer = (prevState: StateType, action: ActionType): StateType => {
        switch (action.type) {
            // If weight or height is entered, update the State:
            case 'UPDATE': {
                return {
                    ...prevState,
                    [action.param]: action.value,
                };
            }

            // If the calculation is triggered, calculate BMI:
            case 'CALCULATE_BMI': {
                // Convert the input height and weight to numbers or set them to zero if they are invalid:
                const weight = Number(prevState.weight) || 0;
                const height = Number(prevState.height) || 0;

                // validation
                // If the weight and height values ​​are invalid, stop executing the function:
                if (weight <= 0 || height <= 0 || height > 300 || weight >= 500) {
                    return {
                        ...prevState,
                        bmi: undefined,
                        category: undefined,
                        message: content?.errors?.invalidInput,
                    };
                }

                // To calculate BMI, convert centimeters to meters:
                const heightInMeters = height / 100;

                // calculate BMI
                const bmi = weight / (heightInMeters * heightInMeters);
                // round BMI
                const roundedBMI = Math.round(bmi * 10) / 10;

                // Categorize the user into a status based on BMI and show them a message.
                let category: string | undefined = "";
                let message: string | undefined = "";
                if (bmi < 18.5) {
                    category = content?.categories?.underweight;
                    message = content?.messages?.underweight;
                } else if (bmi < 25) {
                    category = content?.categories?.normal;
                    message = content?.messages?.normal;
                } else if (bmi < 30) {
                    category = content?.categories?.overweight;
                    message = content?.messages?.overweight;
                } else {
                    category = content?.categories?.obese;
                    message = content?.messages?.obese;
                }

                // Update the State:
                return {
                    ...prevState,
                    bmi: roundedBMI,
                    category,
                    message
                };
            }
            case "RESET": {
                // Reset the State:
                return {
                    weight: undefined,
                    height: undefined,
                    bmi: undefined,
                    category: undefined,
                    message: undefined,
                };
            }
            // A piece of code that shouldn't happen, but if it does, return the State:
            default:
                return prevState;
        }
    };

    // Function to identify the minimum and maximum weight allowed for the user:
    const calculateWeightRange = (h: number | undefined) => {
        if (!h || h <= 0) return { min: "0", max: "0" };

        const heightInMeters = h / 100;
        const min = 18.5 * heightInMeters * heightInMeters;
        const max = 24.9 * heightInMeters * heightInMeters;

        return {
            min: min.toFixed(1),
            max: max.toFixed(1)
        };
    };

    // Initial value for initialState
    const initialState: () => BMIState = () => {
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


    const [history, setHistory] = useState<{
        id: number;
        date: string;
        weight: number;
        height: number;
        bmi: number;
        category: string;
        message?: string;
    }[]>(() => {
        const savedHistory = localStorage.getItem('BMI_History');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    // variable for identify the minimum and maximum weight allowed for the user:
    const weightRange = calculateWeightRange(state.height);

    // Calculate BMI live and quickly (with debounce) every time you change the input values ​​for weight and height:
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (state.weight && state.height)
                dispatch({ type: 'CALCULATE_BMI' })
        }, 100); // 300ms delay

        return () => clearTimeout(timeoutId);
    }, [state, content]);

    // Calculate BMI percentage for progress bar
    const getBMIProgress = () => {
        if (!state.bmi)
            return { percentage: 0, color: 'bg-gray-500' };

        const bmi = state.bmi;
        let percentage = 0;
        let color = 'bg-gray-500';

        // Calculate percentage based on BMI range
        if (bmi < 18.5) {
            percentage = (bmi / 18.5) * 25; // 0-25%
            color = 'bg-blue-800/60'; // Blue for weight loss
        } else if (bmi < 25) {
            percentage = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25; // 25-50%
            color = 'bg-green-800/60'; // Green for normal
        } else if (bmi < 30) {
            percentage = 50 + ((bmi - 25) / (30 - 25)) * 25; // 50-75%
            color = 'bg-yellow-800/60'; // Yellow for weight gain
        } else if (bmi < 40) {
            percentage = 75 + ((bmi - 30) / (40 - 30)) * 25; // 75-100%
            color = 'bg-red-800/60'; // Red for fat
        } else {
            percentage = 100;
            color = 'bg-red-800/60'; // Dark red for severe obesity
        }

        return { percentage: Math.min(100, Math.max(0, percentage)), color };
    };

    const bmiProgress = getBMIProgress();

    return (
        <ToolCard id="BMI_Calculator">
            {/* User height input: */}
            <InputBox
                id="height"
                name="height"
                placeholder={content?.placeholders?.height}
                // Update the state.height with each input change:
                onChangeFn={(v) =>
                    dispatch({
                        type: "UPDATE",
                        param: 'height',
                        value: Number(v)
                    })
                }
                label={content?.labels?.height + ":"}
                focused={true}
            />

            {/* User Weight input: */}
            <InputBox
                id="weight"
                name="weight"
                placeholder={content?.placeholders?.weight}
                // Update the state.weight with each input change:
                onChangeFn={(v) =>
                    dispatch({
                        type: "UPDATE",
                        param: 'weight',
                        value: Number(v)
                    })
                }
                label={content?.labels?.weight + ":"}
            />

            {/* Display BMI Calculate Result */}
            <div>
                {state.bmi ?
                    (state.weight && state.height) ? (
                        <div>
                            {/* Display BMI */}
                            <ResultDisplay
                                label={content?.resultLabels?.bmi}
                                result={state.bmi}
                                placeholder={content?.resultLabels?.result}
                                toastMessage={content?.toast?.bmiCopied}
                            />

                            <div className="flex gap-4">
                                <button
                                    className="w-1/2 text-center p-2 bg-red-900/40 hover:bg-red-800/60 text-red-300 hover:text-white 
                     rounded-lg border border-red-700/50 hover:border-red-600/70 
                     transition-all duration-200 hover:scale-105 active:scale-95"
                                    onClick={() => {
                                        setHistory([]);
                                        localStorage.removeItem('BMI_History');
                                        dispatch({ type: "RESET" })
                                    }}
                                >
                                    Reset
                                </button>
                                <button
                                    className="w-1/2 text-center p-2 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 hover:text-white 
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
                                                const newEntry: {
                                                    id: number;
                                                    date: string;
                                                    weight: number;
                                                    height: number;
                                                    bmi: number;
                                                    category: string;
                                                    message?: string;
                                                } = {
                                                    id: Date.now(),
                                                    date: new Date().toLocaleString('en-US', {
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
                                    Save
                                </button>
                            </div>

                            {/*  */}
                            {/* BMI Progress Bar - Added */}
                            <div className="mt-4 mb-6 p-4 bg-white text-black dark:bg-gray-700 dark:text-white rounded-xl border border-gray-700/50">
                                <div className="mb-2 flex justify-between items-center">
                                    <span className="text-sm">
                                        {content?.progressLabel || "BMI Range"}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {state.bmi.toFixed(1)}
                                    </span>
                                </div>

                                {/* Progress Bar Container */}
                                <div className="relative h-8 bg-gray-400/30 rounded overflow-hidden">
                                    {/* Progress Fill */}
                                    <div
                                        className={`h-full ${bmiProgress.color} transition-all duration-300 ease-out rounded`}
                                        style={{ width: `${bmiProgress.percentage}%` }}
                                    />

                                    {/* BMI Range Markers */}
                                    <div className="absolute inset-0 flex justify-between items-center px-1">
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-100" />
                                            <span className="text-xs text-white mt-1">15</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-100" />
                                            <span className="text-xs text-white mt-1">18.5</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-100" />
                                            <span className="text-xs text-white mt-1">25</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-100" />
                                            <span className="text-xs text-white mt-1">30</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-100" />
                                            <span className="text-xs text-white mt-1">35</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-100" />
                                            <span className="text-xs text-white mt-1">40+</span>
                                        </div>
                                    </div>

                                </div>

                                {/* Range Labels */}
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    <span>{content?.categories?.underweight}</span>
                                    <span>{content?.categories?.normal}</span>
                                    <span>{content?.categories?.overweight}</span>
                                    <span>{content?.categories?.obese}</span>
                                </div>
                            </div>

                            {/*  */}
                            {/* Show the category the user falls into:*/}
                            {state.category && state.message ?
                                (
                                    <TextChip classes="border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 from-white">
                                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-purple-500/20">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                                <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                    {content?.resultLabels?.result}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const text = `My BMI: ${state.bmi} (${state.category})`;
                                                    navigator.share({ title: 'My BMI Data', text })
                                                }}
                                                className="p-1.5 bg-blue-900/40 hover:bg-blue-800/60 rounded-lg border border-blue-700/50 hover:border-blue-600/70 transition-all duration-200 hover:scale-105 active:scale-95"
                                            >
                                                <DynamicIcon icon="share" />
                                            </button>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-3 mb-3 text-black dark:text-gray-400">
                                            <div className="flex-1 flex-col p-3 dark:bg-gray-800/50 rounded-lg border border-gray-700/50">
                                                <div className="text-xs mb-1">{content?.labels?.weight}</div>
                                                <div className="text-lg font-bold text-black dark:text-white">
                                                    {state.weight + ' '}
                                                    <span className="block text-sm text-purple-400 ml-1">{content?.units?.kg}</span>
                                                </div>
                                            </div>

                                            <div className="flex-1 flex-col p-3 dark:bg-gray-800/50 rounded-lg border border-gray-700/50">
                                                <div className="text-xs mb-1">{content?.labels?.height}</div>
                                                <div className="text-lg font-bold text-black dark:text-white">
                                                    {state.height + ' '}
                                                    <span className="block text-sm text-purple-400 ml-1">{content?.units?.cm}</span>
                                                </div>
                                            </div>

                                            <div className="flex-1 p-3 dark:bg-gradient-to-br dark:from-blue-900/40 dark:to-purple-900/40 
                       rounded-lg border border-blue-700/30">
                                                <div className="text-xs text-blue-400 mb-1">{content?.resultLabels?.bmi}</div>
                                                <div className="text-xl font-bold text-black dark:text-white">
                                                    {state.bmi?.toFixed(1)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 p-3 dark:bg-gray-900/40 rounded-lg">
                                            <div className="flex-1 p-2 text-center">
                                                <div className={`
                                        px-3 py-1.5 rounded-full font-semibold text-sm
                                        ${state.bmi && (
                                                        state.bmi < 18.5 ? 'bg-blue-900/40 text-blue-400 border border-blue-700/50' :
                                                            state.bmi < 25 ? 'bg-green-900/40 text-green-400 border border-green-700/50' :
                                                                state.bmi < 30 ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/50' :
                                                                    'bg-red-900/40 text-white dark:text-red-400 border border-red-700/50'
                                                    )
                                                    }`}
                                                >
                                                    {state.category}
                                                </div>
                                            </div>

                                            <div className="flex-1 p-2 text-center">
                                                <div className="px-3 py-1.5 text-black dark:text-gray-100 text-sm leading-relaxed bg-gray-500/30 rounded-lg">
                                                    {state.message}
                                                </div>
                                            </div>

                                            {/* Show user BMI status message: */}
                                            <div className="px-3 py-1.5 text-black dark:text-gray-100 text-sm leading-relaxed bg-gray-500/30 rounded-lg">
                                                <div className="opacity-90">
                                                    {content?.weightRangeText + ' '}
                                                    <span className="text-green-500">
                                                        {state.height + ' '}
                                                    </span>
                                                    <span className="text-purple-400">
                                                        {content?.units?.cm + ' '}
                                                    </span>
                                                    <span>
                                                        {content?.common?.is + ": "}
                                                    </span>
                                                </div>

                                                {/* Show the minimum and maximum allowed user weight: */}
                                                <div>
                                                    <span className="text-blue-500">
                                                        {weightRange.min + ' '}
                                                    </span>
                                                    <span className="text-purple-400">
                                                        {content?.units?.kg + ' '}
                                                    </span>
                                                    {' ' + content?.common?.to + ' '}
                                                    <span className="text-red-500">
                                                        {weightRange.max + ' '}
                                                    </span>
                                                    <span className="text-purple-400">
                                                        {content?.units?.kg + ' '}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </TextChip>
                                ) : null
                            }
                        </div>
                    ) : null
                    : (
                        // If the input is invalid, show an invalid input message:
                        state.message ? (
                            <TextChip isCopyOn={false}>
                                <div className="text-red-500 font-bold">
                                    {state.message}
                                </div>
                            </TextChip>
                        ) : null
                    )}
            </div>
            {
                history.length > 0 && (
                    <TextChip classes="border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 from-white mt-6">
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-purple-500/20">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    📜 {content?.labels?.history || "History"} ({history.length})
                                </div>
                            </div>
                            <button
                                className="p-1.5 bg-red-900/40 hover:bg-red-800/60 text-red-300 hover:text-white 
                     rounded-lg border border-red-700/50 hover:border-red-600/70 
                     transition-all duration-200 hover:scale-105 active:scale-95"
                                onClick={() => {
                                    setHistory([]);
                                    localStorage.removeItem('BMI_History');
                                }}
                            >
                                <DynamicIcon icon="close" />
                            </button>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {history.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`p-3 rounded-lg border ${index === 0 ? 'border-blue-500/30 bg-blue-500/5' : 'border-gray-700/50 bg-gray-800/20'}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-sm text-gray-400">#{history.length - index} • {item.date}</div>
                                        <button
                                            onClick={() => {
                                                const updatedHistory = history.filter(h => h.id !== item.id);
                                                setHistory(updatedHistory);
                                                localStorage.setItem('BMI_History', JSON.stringify(updatedHistory));
                                            }}
                                            className="text-xs text-red-400 hover:text-red-300"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="flex gap-3 mb-2">
                                        <div className="text-center flex-1">
                                            <div className="text-xs text-gray-500">{content?.labels?.weight}</div>
                                            <div className="font-bold">{item.weight} {content?.units?.kg}</div>
                                        </div>
                                        <div className="text-center flex-1">
                                            <div className="text-xs text-gray-500">{content?.labels?.height}</div>
                                            <div className="font-bold">{item.height} {content?.units?.cm}</div>
                                        </div>
                                        <div className="text-center flex-1">
                                            <div className="text-xs text-gray-500">{content?.resultLabels?.bmi}</div>
                                            <div className="font-bold text-lg">{item.bmi.toFixed(1)}</div>
                                        </div>
                                    </div>

                                    <div className={`text-center text-sm font-medium px-3 py-1 rounded-full mt-2
                            ${item.bmi < 18.5 ? 'bg-blue-900/40 text-blue-300' :
                                            item.bmi < 25 ? 'bg-green-900/40 text-green-300' :
                                                item.bmi < 30 ? 'bg-yellow-900/40 text-yellow-300' :
                                                    'bg-red-900/40 text-red-300'}`}
                                    >
                                        {item.category}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-xs text-gray-500 text-center mt-3">
                            {content?.labels?.history || "Calculations are saved locally in your browser"}
                        </div>
                    </TextChip>
                )
            }
        </ToolCard>
    )
}

export default BMICalculator;