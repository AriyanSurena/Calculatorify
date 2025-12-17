import { useEffect, useState } from "react";
import handleCalculate from "../../utils/Converter/handleCalculate";
import Input from "../Input";
import TextChip from "../TextChlip";
import ResultDisplay from "../ResultDisplay";
import Menu from "../Menu";
import ToolCard from "../ToolCard";
import { isNumber } from "../../utils/typeGuards";
import En from "./languages/en.json";
import Fa from "./languages/fa.json";
import unitsFa from "./languages/units.fa.json";
import unitsEn from "./languages/units.en.json";
import { useLanguage } from "../../Context/useLanguage";
import useToolConfig from "../../Context/useContentConfig";


type ContentType = typeof En;
type UnitsDataType = typeof unitsEn;

const Converter: React.FC = () => {
    // 
    const { language } = useLanguage();

    // انتخاب محتوا بر اساس زبان
    const content: ContentType = useToolConfig<ContentType>(En,Fa);
    const unitsData: UnitsDataType = language.includes('en-US') ? unitsEn : unitsFa;

    // لیست دسته‌بندی‌ها
    const categories = Object.keys(unitsData);

    // مقداردهی اولیه
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [fromUnit, setFromUnit] = useState<string>("");
    const [toUnit, setToUnit] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");
    const [result, setResult] = useState<number>();


    // مقداردهی اولیه واحدها
    useEffect(() => {
        if (selectedCategory && unitsData[selectedCategory as keyof UnitsDataType]?.units?.length > 0) {
            const units = unitsData[selectedCategory as keyof UnitsDataType].units;
            setFromUnit(units[0].unit);
            setToUnit(units[1]?.unit || units[0].unit);
        }
    }, [selectedCategory]);

    // وقتی واحدها یا مقدار تغییر کرد، محاسبه کن
    useEffect(() => {
        const numValue = parseFloat(inputValue);
        if (isNaN(numValue)) {
            setResult(undefined);
            return;
        }

        handleCalculate(
            selectedCategory,
            fromUnit,
            toUnit,
            numValue,
            setResult
        );
    }, [inputValue, fromUnit, toUnit]);
    
    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    // گرفتن لیست واحدها برای Menu
    const getUnitList = (category: string) => {
        return unitsData[category as keyof UnitsDataType]?.units.map(unit => ({
            key: unit.unit,
            label: unit.display
        })) || [];
    };

    // فرمت اعداد
    const formatNumber = (num: number | undefined): string => {
        if (num === undefined || isNaN(num)) return "";
        return new Intl.NumberFormat(language.includes('en-US') ? 'en-US' : 'fa-IR').format(num);
    };

    return (
        <ToolCard id="Converter">
            {/* دسته‌بندی */}
            <div className="text-center p-2 select-none overflow-x-hidden">
                {content.labels.category}:
            </div>
            <Menu
                id="category"
                list={categories.map(cat => ({
                    key: cat,
                    label: unitsData[cat as keyof UnitsDataType].displayName
                }))}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
            />

            {/* ورودی */}
            <Input
                name="InputValue"
                id="inputValue"
                placeholder={content.placeholders.inputValue}
                onChange={handleInputChange}
            />

            {/* تبدیل از */}
            <div className="text-center select-none overflow-x-hidden">
                {content.labels.convertFrom}
            </div>

            <Menu
                id="convertFrom"
                list={getUnitList(selectedCategory)}
                selected={fromUnit}
                setSelected={setFromUnit}
            />

            {/* تبدیل به */}
            <div className="text-center select-none overflow-x-hidden">
                {content.labels.convertTo}
            </div>

            <Menu
                id="convertTo"
                list={getUnitList(selectedCategory)}
                selected={toUnit}
                setSelected={setToUnit}
            />

            {/* نتیجه */}
            <ResultDisplay
                label={content.labels.convertTo}
                placeholder={content.placeholders.result}
                result={Number(result)}
                toastMessage={result + ' ' + content?.toast?.copied}
            />

            {/* نمایش متن */}
            {inputValue && result && isNumber(parseFloat(inputValue)) && (
                <TextChip
                    isCopyOn={true}
                    toastMessage={content.toast?.convertCopied || "Copied!"}
                >
                    <div className="overflow-x-hidden text-center">
                        <span className="text-blue-500">{formatNumber(parseFloat(inputValue))} </span>
                        <span className="text-blue-300">
                            {unitsData[selectedCategory as keyof UnitsDataType]?.units.find(u => u.unit === fromUnit)?.display || fromUnit}
                        </span>
                        {` ${content.messages.isEqual} `}
                        <span className="text-green-500">{formatNumber(result)} </span>
                        <span className="text-green-300">
                            {unitsData[selectedCategory as keyof UnitsDataType]?.units.find(u => u.unit === toUnit)?.display || toUnit}
                        </span>
                    </div>
                </TextChip>
            )}
        </ToolCard>
    );
}

export default Converter;