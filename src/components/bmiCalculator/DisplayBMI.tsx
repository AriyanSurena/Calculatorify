import useLanguage from "../../hooks/useLanguage";
import { calculateWeightRange } from "./bmiUtils/calculateWeightRange.utils";
import type { DisplayBMIType } from "./bmiCalculator.types";
import DynamicIcon from "../SvgIcons/DynamicIcon";
import ResultDisplay from "../common/ResultDisplay";
import TextChip from "../common/TextChlip";
import BMIProgressBar from "./BmiProgressbar";

const DisplayBMI: React.FC<DisplayBMIType> = ({
    state,
    content
}) => {
    // variable for identify the minimum and maximum weight allowed for the user:
    const weightRange = calculateWeightRange(state.height);

    const { language } = useLanguage();
    
    return (
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


                        <BMIProgressBar
                            content={content}
                            bmi={state.bmi}
                        />

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
                                                const text = `${content?.resultLabels?.bmi}: ${state.bmi} (${state.category}) \n ${content?.labels?.weight}: ${state.weight} \n ${content?.labels?.height}: ${state.height} \n ${new Date().toLocaleString(language, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}`;
                                                navigator.share({ title: `${content?.resultLabels?.bmi}`, text })
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
                                                <span className="text-purple-500">
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
                                                <span className="text-purple-500">
                                                    {content?.units?.kg + ' '}
                                                </span>
                                                {' ' + content?.common?.to + ' '}
                                                <span className="text-red-500">
                                                    {weightRange.max + ' '}
                                                </span>
                                                <span className="text-purple-500">
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
                )
            }
        </div>
    )
}

export default DisplayBMI;