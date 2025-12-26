import { STANDARD_RANGES } from "../standardRanges";

// Function to identify the minimum and maximum weight allowed for the user:
export const calculateWeightRange = (h: number | undefined) => {
    if (!h || h <= STANDARD_RANGES.height.min) return { min: STANDARD_RANGES.height.min, max: STANDARD_RANGES.height.max };

    const heightInMeters = h / 100;
    const min = 18.5 * heightInMeters * heightInMeters;
    const max = 24.9 * heightInMeters * heightInMeters;

    return {
        min: min.toFixed(1),
        max: max.toFixed(1)
    };
};