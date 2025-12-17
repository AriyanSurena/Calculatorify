import { useEffect, useReducer } from "react";
import ResultDisplay from "../ResultDisplay";
import TextChip from "../TextChlip";
import InputBox from "../InputBox";
import ToolCard from "../ToolCard";
import en_US from "./languages/en.json";
import fa_IR from "./languages/fa.json";
import useContentConfig from "../../Context/useContentConfig";
import type { ActionType, BMIState, StateType } from "./BMICalculator.types";

/**
 * BMI calculation component.
 * @returns Component
 */
const BMICalculator: React.FC = () => {
    // The component content is initialized based on the system language or the user's selected language.
    const content = useContentConfig<typeof en_US>(en_US, fa_IR);

    // Initial value for initialState
    const initialState: BMIState = {
        weight: undefined,
        height: undefined,
        category: undefined,
        message: undefined,
    }

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

    // The overall state of the component that holds the data and updates it with useReducer:
    const [state, dispatch] = useReducer(reducer, initialState);


    // variable for identify the minimum and maximum weight allowed for the user:
    const weightRange = calculateWeightRange(state.height);

    // Calculate BMI live and quickly (with debounce) every time you change the input values ​​for weight and height:
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (state.weight && state.height)
                dispatch({ type: 'CALCULATE_BMI' })
        }, 100); // 300ms delay

        return () => clearTimeout(timeoutId);
    }, [state.weight, state.height]);

    // محاسبه درصد BMI برای progress bar
    const getBMIProgress = () => {
        if (!state.bmi)
            return { percentage: 0, color: 'bg-gray-500' };

        const bmi = state.bmi;
        let percentage = 0;
        let color = 'bg-gray-500';

        // محاسبه درصد بر اساس محدوده BMI
        if (bmi < 18.5) {
            percentage = (bmi / 18.5) * 25; // 0-25%
            color = 'bg-blue-500'; // آبی برای کم‌وزن
        } else if (bmi < 25) {
            percentage = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25; // 25-50%
            color = 'bg-green-500'; // سبز برای نرمال
        } else if (bmi < 30) {
            percentage = 50 + ((bmi - 25) / (30 - 25)) * 25; // 50-75%
            color = 'bg-yellow-500'; // زرد برای اضافه وزن
        } else if (bmi < 40) {
            percentage = 75 + ((bmi - 30) / (40 - 30)) * 25; // 75-100%
            color = 'bg-red-500'; // قرمز برای چاق
        } else {
            percentage = 100;
            color = 'bg-red-700'; // قرمز تیره برای چاقی شدید
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

                            {/*  */}
                            {/* BMI Progress Bar - اضافه شد */}
                            <div className="mt-4 mb-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                                <div className="mb-2 flex justify-between items-center">
                                    <span className="text-sm text-gray-300">
                                        {content?.progressLabel || "BMI Range"}
                                    </span>
                                    <span className="text-sm font-medium text-white">
                                        {state.bmi.toFixed(1)}
                                    </span>
                                </div>

                                {/* Progress Bar Container */}
                                <div className="relative h-8 bg-gray-700 rounded overflow-hidden">
                                    {/* Progress Fill */}
                                    <div
                                        className={`h-full ${bmiProgress.color} transition-all duration-300 ease-out rounded`}
                                        style={{ width: `${bmiProgress.percentage}%` }}
                                    />

                                    {/* BMI Range Markers */}
                                    <div className="absolute inset-0 flex justify-between items-center px-1">
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-500" />
                                            <span className="text-xs text-gray-400 mt-1">15</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-500" />
                                            <span className="text-xs text-gray-400 mt-1">18.5</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-500" />
                                            <span className="text-xs text-gray-400 mt-1">25</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-500" />
                                            <span className="text-xs text-gray-400 mt-1">30</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-500" />
                                            <span className="text-xs text-gray-400 mt-1">35</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-px h-3 bg-gray-500" />
                                            <span className="text-xs text-gray-400 mt-1">40+</span>
                                        </div>
                                    </div>

                                    {/* Current BMI Indicator */}
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-800 shadow-lg"
                                        style={{ left: `${bmiProgress.percentage}%`, marginLeft: '-6px' }}
                                    />
                                </div>

                                {/* Range Labels */}
                                <div className="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>{content?.categories?.underweight}</span>
                                    <span>{content?.categories?.normal}</span>
                                    <span>{content?.categories?.overweight}</span>
                                    <span>{content?.categories?.obese}</span>
                                </div>
                            </div>

                            {/*  */}
                            {/* Show the category the user falls into:*/}
                            <TextChip isCopyOn={true} toastMessage={content?.toast?.messageCopied}>
                                <div className="p-2 my-2">
                                    {state.category}
                                </div>

                                <div className="opacity-80">
                                    {state.message}
                                </div>

                                {state.category && (
                                    // Show user BMI status message:
                                    <div>
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
                                )}
                            </TextChip>

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
        </ToolCard>
    )
}

export default BMICalculator;