import { useEffect, useReducer, useState } from "react";
import ResultDisplay from "../ResultDisplay";
import TextChip from "../TextChlip";
import InputBox from "../InputBox";
import ToolCard from "../ToolCard";
import { useLanguage } from "../../Context/useLanguage";
import En from "./languages/en.json";
import Fa from "./languages/fa.json";

interface BMIState {
    weight: number | undefined,
    height: number | undefined,
    category?: string | undefined,
    message?: string | undefined,
}

type StateType = {
    weight?: number;
    height?: number;
    bmi?: number;
    category?: string;
    message?: string;
};

type ActionType =
    { type: "UPDATE"; param: keyof StateType; value: string | number }
    | { type: "CALCULATE_BMI" };


type contentuageType = typeof En

const BMICalculator: React.FC = () => {
    const { language } = useLanguage();
    const [content, setContent] = useState<contentuageType>();
    useEffect(() => {
        setContent(Fa)
        switch (language) {
            case "en-US": {
                setContent(En)
            } break;
            case "fa-IR": {
                setContent(Fa)
            } break;
        }

        dispatch({ type: "CALCULATE_BMI" })
    }, [language])

    const initialState: BMIState = {
        weight: undefined,
        height: undefined,
        category: undefined,
        message: undefined,
    }


    const reducer = (prevState: StateType, action: ActionType): StateType => {
        switch (action.type) {
            case 'UPDATE': {
                return {
                    ...prevState,
                    [action.param]: action.value,
                };
            }

            case 'CALCULATE_BMI': {
                const weight = Number(prevState.weight) || 0;
                const height = Number(prevState.height) || 0;

                if (weight <= 0 || height <= 0) {
                    return prevState;
                }

                const heightInMeters = height / 100;

                const bmi = weight / (heightInMeters * heightInMeters);
                const roundedBMI = Math.round(bmi * 10) / 10;

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


                // اعتبارسنجی بهتر
                if (weight <= 0 || height <= 0 || height > 300 || weight >= 500) {
                    return {
                        ...prevState,
                        bmi: undefined,
                        category: undefined,
                        message: content?.errors?.invalidInput,
                    };
                }

                return {
                    ...prevState,
                    bmi: roundedBMI,
                    category,
                    message
                };
            }
            default:
                return prevState;
        }
    };

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

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'CALCULATE_BMI' })
    }, [state.weight, state.height])


    const weightRange = calculateWeightRange(state.height);

    return (
        <ToolCard id="BMI_Calculator">
            <InputBox id="height" name="height" placeholder={content?.placeholders?.height} onChangeFn={(v) => dispatch({ type: "UPDATE", param: 'height', value: Number(v) })} label={content?.labels?.height + ":"} />
            <InputBox id="weight" name="weight" placeholder={content?.placeholders?.weight} onChangeFn={(v) => dispatch({ type: "UPDATE", param: 'weight', value: Number(v) })} label={content?.labels?.weight + ":"} />
            <div>
                {state.bmi ?
                    (state.weight && state.height) ? (
                        <div>
                            <ResultDisplay
                                label={content?.resultLabels?.bmi}
                                result={state.bmi}
                                placeholder={content?.resultLabels?.result}
                                toastMessage={content?.toast?.bmiCopied}
                            />
                            <TextChip isCopyOn={true} toastMessage={content?.toast?.messageCopied}>
                                <div className="p-2 my-2">
                                    {state.category}
                                </div>

                                <div className="opacity-80">
                                    {state.message}

                                </div>

                                {state.category && (
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
                                                {content?.common?.is}
                                            </span>
                                        </div>

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