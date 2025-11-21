import { useEffect, useState } from "react";
import UnitsJSON from "../../assets/Units.json";
import handleCalculate from "../../utils/Converter/handleCalculate";
import Input from "../Input";
import TextChip from "../TextChlip";
import ResultDisplay from "../ResultDisplay";
import Menu from "../Menu";
import ToolCard from "../ToolCard";
import { useToast } from "../../Context/useToast";

interface UnitsObj {
    Area: string[];
    Length: string[];
    Temperature: string[];
    Volume: string[];
    Mass: string[];
    Data: string[];
    Speed: string[];
    Time: string[];
    [key: string]: any[];
}

type unitTypesListType = string[];

const Converter: React.FC = () => {
    const unitsCategory: UnitsObj = UnitsJSON;
    let unitTypesList: unitTypesListType = [];

    for (const unit in unitsCategory) {
        unitTypesList.push(unit);
    }

    const [selectedUnitType, setSelectedUnitType] = useState<string>(unitTypesList[0]);
    const [convertFromUnit, setConvertFromUnit] = useState<string>(unitsCategory[selectedUnitType][0])
    const [convertToUnit, setConvertToUnit] = useState<string>(unitsCategory[selectedUnitType][1])
    const [convertFromValue, setConvertFromValue] = useState<number>()
    const [convertToValue, setConvertToValue] = useState<number>()
    const { setToast } = useToast()

    function handleConverter(value: string): void {
        const converterValue = parseFloat(value);
        if (Number.isNaN(value)) {
            setToast({
                    type: "error",
                    duration: 2000,
                    message: "Please enter a valid number:"
                });
            return;
        }; // یا مقدار پیش‌فرض
        setConvertFromValue(converterValue);
        handleCalculate(
            selectedUnitType,
            convertFromUnit,
            convertToUnit,
            converterValue,
            setConvertToValue
        );
    }

    useEffect(() => {
        if (convertFromValue !== undefined && !isNaN(convertFromValue)) {
            handleConverter(String(convertFromValue));
        }
    }, [convertFromUnit, convertToUnit])

    useEffect(() => {
        if (unitsCategory[selectedUnitType]?.length > 0) {
            setConvertFromUnit(unitsCategory[selectedUnitType][0]);
            setConvertToUnit(unitsCategory[selectedUnitType][1] || unitsCategory[selectedUnitType][0]);
        }
    }, [selectedUnitType, unitsCategory]);

    let formattedConvertFromValue = new Intl.NumberFormat().format(Number(convertFromValue));
    let formattedConvertToValue = new Intl.NumberFormat().format(Number(convertToValue));

    return (
        <ToolCard id="Converter">
            <Menu id='category' list={unitTypesList} setSelected={setSelectedUnitType} selected={selectedUnitType} />
            <Input name="InputValue" id="inputValue" placeholder="Enter" onChange={handleConverter} />
            <Menu id={'convertFrom'} list={unitsCategory[selectedUnitType]} selected={convertFromUnit} setSelected={setConvertFromUnit} />
            <ResultDisplay placeholder="Result" result={Number(convertToValue)} />
            <Menu id={'convertTo'} list={unitsCategory[selectedUnitType]} selected={convertToUnit} setSelected={setConvertToUnit} />
            {
                !isNaN(convertFromValue as number) && !isNaN(convertToValue as number) && (
                    <TextChip>
                        <div className="overflow-x-hidden">
                            <span className="text-blue-500">{` ${formattedConvertFromValue} `}</span>
                            <span className="text-blue-300">{` ${convertFromUnit} `}</span>
                            {' is equal to '}
                            <span className="text-green-500">{` ${formattedConvertToValue} `}</span>
                            <span className="text-green-300">{` ${(Number(convertToUnit) < 0.001) ? Math.round(Math.max(Number(convertToUnit))) : convertToUnit} `}</span>
                        </div>
                    </TextChip>
                )
            }
        </ToolCard>
    )
}

export default Converter;