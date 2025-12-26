import type { BMIProgressBarType } from "../BmiCalculator.types";

// Calculate BMI percentage for progress bar
export const getBMIProgress = ({ bmi }: BMIProgressBarType) => {
    if (!bmi)
        return { percentage: 0, color: 'bg-gray-500' };
    
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