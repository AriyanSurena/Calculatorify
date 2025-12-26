import type { ActionType, BMIStateType, ContentType } from "../bmiCalculator.types";
import { STANDARD_RANGES } from "../standardRanges";

export const createReducer = (content: ContentType) => {
    return (prevState: BMIStateType, action: ActionType): BMIStateType => {
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

                // validation: If the weight and height values invalid, stop executing the function:
                if (weight < STANDARD_RANGES.weight.min) {
                    return {
                        ...prevState,
                        bmi: undefined,
                        category: undefined,
                        message: content?.errors?.weightBelowRange,
                    };

                } else if (weight > STANDARD_RANGES.weight.max) {
                    return {
                        ...prevState,
                        bmi: undefined,
                        category: undefined,
                        message: content?.errors?.weightExceedsRange,
                    };
                    
                } else if (height < STANDARD_RANGES.height.min) {
                    return {
                        ...prevState,
                        bmi: undefined,
                        category: undefined,
                        message: content?.errors?.heightBelowRange,
                    };
                    
                } else if (height > STANDARD_RANGES.height.max)
                    return {
                        ...prevState,
                        bmi: undefined,
                        category: undefined,
                        message: content?.errors?.weightExceedsRange,
                    };

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
}