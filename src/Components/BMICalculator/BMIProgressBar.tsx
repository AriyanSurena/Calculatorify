    import { getBMIProgress } from "./BMI Utils/getBMIProgress.utils";
    import type { BMIProgressBarType } from "./BMICalculator.types";

    const BMIProgressBar: React.FC<BMIProgressBarType> = ({
        bmi,
        content
    }) => {

        // Get The ProgressBar Data:
        const bmiProgress = getBMIProgress({ bmi, content });
        const bmiProgressSeperators: string[] = ['-', '15', '18.5', '25', '30', '35', '40', '+']
        if (bmi)
            return (
                //  BMI Progress Bar - Added
                <div className="mt-4 mb-6 p-4 bg-white text-black dark:bg-gray-700 dark:text-white rounded-xl border border-gray-700/50">
                    <div className="mb-2 flex justify-between items-center">
                        <span className="text-sm">
                            {content?.progressLabel || "BMI Range"}
                        </span>
                        <span className="text-sm font-medium">
                            {bmi.toFixed(1)}
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
                        {
                            bmiProgressSeperators.map((seperator) => (        
                            <div className="flex flex-col items-center" key={seperator}>
                                <div className="w-px h-3 bg-gray-100 dark:bg-gray-300" />
                                <span className="text-xs text-white dark:text-gray-300 mt-1">{seperator}</span>
                            </div>
                            ))
                        }
                        </div>
                    </div>

                    {/* Range Labels */}
                    <div className="flex justify-evenly text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>{content?.categories?.underweight}</span>
                        <span>{content?.categories?.normal}</span>
                        <span>{content?.categories?.overweight}</span>
                        <span>{content?.categories?.obese}</span>
                    </div>
                </div>
            )
        return null;
    }

    export default BMIProgressBar;