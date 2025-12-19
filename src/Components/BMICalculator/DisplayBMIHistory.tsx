import DynamicIcon from "../../SVGIcons/DynamicIcon";
import TextChip from "../TextChlip";
import type { BMIHistoryType, ContentType } from "./BMICalculator.types";

interface DisplayBMIHistoryType {
    content: ContentType;
    history: BMIHistoryType[];
    setHistory: (history: BMIHistoryType[]) => void;
}

const DisplayBMIHistory: React.FC<DisplayBMIHistoryType> = ({content, history, setHistory}) => {
    return (
        <TextChip classes="border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 from-white mt-6">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                    <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        📜 {content?.labels?.history} ({history.length})
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

            <div className="space-y-3 overflow-y-auto pr-2">
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

export default DisplayBMIHistory;