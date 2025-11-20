import { useEffect, useReducer } from "react";
import InputBox from "../InputBox";
import RadioInputBox from "../RadioInputBox";
import ResultDisplay from "../ResultDisplay";
import ToolCard from "../ToolCard";

interface InvestmentForm {
    initialAmount?: number;
    interestRate?: number;
    duration?: number;
    interestType: "simple" | "compound";
    compounding: "yearly" | "monthly" | "daily";
    finalAmount?: number; // نتیجه محاسبه
}

type InvestmentAction =
    | { type: "UPDATE_FIELD"; field: keyof InvestmentForm; value: any }
    | { type: "CALCULATE_INVESTMENT" }
    | { type: "RESET_FORM" };

const InvestmentCalculator: React.FC = () => {

    const initialState: InvestmentForm = {
        initialAmount: undefined,
        interestRate: undefined,
        duration: undefined,
        interestType: "simple",
        compounding: "yearly",
        finalAmount: undefined,
    };

    const reducer: (prevState: InvestmentForm, action: InvestmentAction) => InvestmentForm = (prevState, action) => {

        switch (action.type) {
            case "UPDATE_FIELD": {
                return {
                    ...prevState,
                    [action.field]: action.value,
                }
            }

            case "CALCULATE_INVESTMENT": {
                const { initialAmount, interestRate, duration, interestType, compounding } = prevState;

                // بررسی که همه فیلدهای لازم پر شده باشند
                if (!initialAmount || !interestRate || !duration) {
                    return {
                        ...prevState,
                        finalAmount: undefined,
                    };
                }

                let calculatedAmount: number;

                if (interestType === "simple") {
                    // سود ساده: A = P(1 + rt)
                    calculatedAmount = initialAmount * (1 + (interestRate / 100) * duration);
                } else {
                    // سود مرکب
                    let compoundingFrequency: number;
                    switch (compounding) {
                        case "yearly":
                            compoundingFrequency = 1;
                            break;
                        case "monthly":
                            compoundingFrequency = 12;
                            break;
                        case "daily":
                            compoundingFrequency = 365;
                            break;
                        default:
                            compoundingFrequency = 1;
                    }

                    // A = P(1 + r/n)^(nt)
                    calculatedAmount = initialAmount *
                        Math.pow(1 + (interestRate / 100) / compoundingFrequency, compoundingFrequency * duration);
                }

                return {
                    ...prevState,
                    finalAmount: Number(calculatedAmount.toFixed(2)), // گرد کردن به ۲ رقم اعشار
                };
            }

            case "RESET_FORM": {
                return initialState;
            }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        dispatch({
            type: "CALCULATE_INVESTMENT"
        })
    }, [state.interestType, state.interestRate, state.initialAmount, state.duration, state.compounding])


    return (
        <ToolCard id="Investment_Calculator">
            <div className="flex gap-2 justify-around">
                <RadioInputBox
                    id="interestType_simple"
                    name="interestType"
                    labelText="Simple"
                    labelTitle="interest Type is Simple"
                    checked={state.interestType === "simple"}
                    onClickFn={
                        (v) => {
                            dispatch(
                                {
                                    type:"UPDATE_FIELD",
                                    field: "interestType",
                                    value: v
                                }
                            )
                        }
                    }
                    value="simple"
                    />
                <RadioInputBox
                    id="interestType"
                    name="interestType"
                    labelText="Compound"
                    labelTitle="interest Type is Compound"
                    checked={state.interestType === "compound"}
                    onClickFn={
                        (v) => {
                            dispatch(
                                {
                                    type:"UPDATE_FIELD",
                                    field: "interestType",
                                    value: v
                                }
                            )
                        }
                    }
                    value="compound"
                    />
            </div>
            {
                state.interestType === 'compound' ? (
                    <div className="flex justify-evenly">
                        <RadioInputBox
                            id="compound_yearly"
                            name="compounding"
                            labelText="Yearly"
                            labelTitle="Compounding Yearly"
                            checked={state.compounding === "yearly"}
                            onClickFn={
                                (v) => {
                                    dispatch(
                                        {
                                            type: "UPDATE_FIELD",
                                            field: "compounding",
                                            value: v
                                        }
                                    )
                                }
                            }
                            value="yearly"
                            />
                        
                        <RadioInputBox
                            id="compound_monthly"
                            name="compounding"
                            labelText="Monthly"
                            labelTitle="Compounding Monthly"
                            checked={state.compounding === "monthly"}
                            onClickFn={
                                (v) => {
                                    dispatch(
                                        {
                                            type: "UPDATE_FIELD",
                                            field: "compounding",
                                            value: v
                                        }
                                    )
                                }
                            }
                            value="monthly"
                            />
                        
                        <RadioInputBox
                            id="compound_daily"
                            name="compounding"
                            labelText="Daily"
                            labelTitle="Compounding Daily"
                            checked={state.compounding === "daily"}
                            onClickFn={
                                (v) => {
                                    dispatch(
                                        {
                                            type: "UPDATE_FIELD",
                                            field: "compounding",
                                            value: v
                                        }
                                    )
                                }
                            }
                            value="daily"
                        />

                    </div>
                ) : null
            }
            <InputBox
                id="initialAmount"
                name="initialAmount"
                placeholder="Enter Your initial Investment: "
                onChangeFn={
                    (v) => {
                        dispatch(
                            {
                                type: "UPDATE_FIELD",
                                field: "initialAmount",
                                value: v
                            }
                        )
                    }
                }
                label ="initial Investment: " />

            <InputBox
                id="interestRate"
                name="interestRate"
                placeholder="Enter Your Interest Rate: "
                onChangeFn={
                    (v) => {
                        dispatch(
                            {
                                type: "UPDATE_FIELD",
                                field: "interestRate",
                                value: v
                            }
                        )
                    }
                }
                label ="Interest Rate: " />
            <InputBox
                id="duration"
                name="duration"
                placeholder="Enter Your duration: "
                onChangeFn={
                    (v) => {
                        dispatch(
                            {
                                type: "UPDATE_FIELD",
                                field: "duration",
                                value: v
                            }
                        )
                    }
                }
                label ="duration: " />

                <ResultDisplay result={Number(state.finalAmount)} placeholder="Resualt"/>
        </ToolCard>
    )
}

export default InvestmentCalculator;