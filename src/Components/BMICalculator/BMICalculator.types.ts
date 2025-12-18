import en_US from "./languages/en.json"

export type BMIStateType = {
    weight?: number;
    height?: number;
    bmi?: number;
    category?: string;
    message?: string;
};

interface UpdateAction { 
    type: "UPDATE"; 
    param: keyof BMIStateType; 
    value: string | number 
}

interface ResetAction { 
    type: "RESET"; 
}

interface CalculateBMIAction { 
    type: "CALCULATE_BMI" 
};

export type ActionType =  UpdateAction | ResetAction | CalculateBMIAction;
    
export type ContentType = typeof en_US;

export interface BMIProgressBarType {
    bmi: number;
    content?: ContentType;
}

export interface DisplayBMIType {
    state: BMIStateType;
    content: ContentType;
}

export type BMIHistoryType = {
    id: number;
    date: string;
    weight: number;
    height: number;
    bmi: number;
    category: string;
    message?: string;
}