export interface BMIState {
    weight: number | undefined,
    height: number | undefined,
    category?: string | undefined,
    message?: string | undefined,
}

export type StateType = {
    weight?: number;
    height?: number;
    bmi?: number;
    category?: string;
    message?: string;
};

export type ActionType =
    { type: "UPDATE"; param: keyof StateType; value: string | number }
    | { type: "RESET"; }
    | { type: "CALCULATE_BMI" };