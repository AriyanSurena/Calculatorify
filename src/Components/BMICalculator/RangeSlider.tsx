import { useState, useEffect, useRef } from "react";
import DynamicIcon from "../svgIcons/DynamicIcon";
import type { BMIRangeSliderProps } from "./BmiCalculator.types";
import { STANDARD_RANGES } from "./standardRanges";

const BMIRange: React.FC<BMIRangeSliderProps> = ({
    onValueChange,
    content,
    initialValues = {}
}) => {
    const [activeTab, setActiveTab] = useState<"height" | "weight">("height");
    const [height, setHeight] = useState(initialValues.height || STANDARD_RANGES.height.average);
    const [weight, setWeight] = useState(initialValues.weight || STANDARD_RANGES.weight.average);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // ارسال تغییرات به والد
    useEffect(() => {
        onValueChange("height", height);
    }, [height]);

    useEffect(() => {
        onValueChange("weight", weight);
    }, [weight]);

    // هندلر پیمایش لمسی/ماوس
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
        e.preventDefault();
    };

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging || !containerRef.current) return;

        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - startX;

        // حساسیت پیمایش (هر 10 پیکسل = 1 واحد)
        const sensitivity = 10;
        const change = Math.round(deltaX / sensitivity);

        if (activeTab === "height") {
            const newHeight = Math.max(
                STANDARD_RANGES.height.min,
                Math.min(STANDARD_RANGES.height.max, height + change)
            );
            if (newHeight !== height) {
                setHeight(newHeight);
                setStartX(clientX);
            }
        } else {
            const newWeight = Math.max(
                STANDARD_RANGES.weight.min,
                Math.min(STANDARD_RANGES.weight.max, weight + change)
            );
            if (newWeight !== weight) {
                setWeight(Number(newWeight.toFixed(1)));
                setStartX(clientX);
            }
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    // افزودن event listeners
    useEffect(() => {
        if (!isDragging) return;

        const handleMove = (e: MouseEvent | TouchEvent) => handleDragMove(e);
        const handleEnd = () => handleDragEnd();

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("touchmove", handleMove, { passive: false });
        window.addEventListener("mouseup", handleEnd);
        window.addEventListener("touchend", handleEnd);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("mouseup", handleEnd);
            window.removeEventListener("touchend", handleEnd);
        };
    }, [isDragging, startX, height, weight, activeTab]);

    // متدهای افزایش/کاهش
    const increment = () => {
        if (activeTab === "height") {
            setHeight(prev => Math.min(STANDARD_RANGES.height.max, prev + STANDARD_RANGES.height.step));
        } else {
            setWeight(prev => Number((Math.min(STANDARD_RANGES.weight.max, prev + STANDARD_RANGES.weight.step)).toFixed(1)));
        }
    };

    const decrement = () => {
        if (activeTab === "height") {
            setHeight(prev => Math.max(STANDARD_RANGES.height.min, prev - STANDARD_RANGES.height.step));
        } else {
            setWeight(prev => Number((Math.max(STANDARD_RANGES.weight.min, prev - STANDARD_RANGES.weight.step)).toFixed(1)));
        }
    };

    // محاسبه درصد پیشرفت
    const getProgressPercentage = () => {
        if (activeTab === "height") {
            return ((height - STANDARD_RANGES.height.min) /
                (STANDARD_RANGES.height.max - STANDARD_RANGES.height.min)) * 100;
        } else {
            return ((weight - STANDARD_RANGES.weight.min) /
                (STANDARD_RANGES.weight.max - STANDARD_RANGES.weight.min)) * 100;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 select-none">
            {/* Tabs : Height - Weight */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                <button
                    className={`flex-1 p-3 text-center font-semibold text-lg transition-all ${activeTab === "height"
                        ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-500"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                    onClick={() => setActiveTab("height")}
                >
                    <div className="flex items-center justify-center gap-2">
                        <DynamicIcon icon="ruler" />
                        {content?.labels?.height}
                    </div>
                </button>

                <div className="w-px bg-gray-200 dark:bg-gray-700 my-2" />

                <button
                    className={`flex-1 p-3 text-center font-semibold text-lg transition-all ${activeTab === "weight"
                        ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-500"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                    onClick={() => setActiveTab("weight")}
                >
                    <div className="flex items-center justify-center gap-2">
                        <DynamicIcon icon="weight" />
                        {content?.labels?.weight}
                    </div>
                </button>
            </div>

            {/* نمایش مقدار فعلی */}
            <div className="text-center mb-8">
                <div className="text-sm text-gray-500 dark:text-gray-400 m-4">
                    {activeTab === "height" ? content?.labels?.height : content?.labels?.weight}
                </div>
                <div className="text-5xl font-bold text-gray-800 dark:text-white m-4 flex gap-2 justify-center">
                    {activeTab === "height" ? height : weight.toFixed(1)}
                    <span className="text-2xl text-purple-500 ml-2">
                        {activeTab === "height" ? content?.units?.cm : content?.units?.kg}
                    </span>
                </div>
            </div>

            {/* ناحیه پیمایش */}
            <div
                ref={containerRef}
                className="relative mb-8 cursor-pointer"
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
            >
                {/* اسلایدر بصری */}
                <div className="flex flex-col justify-evenly h-32 rounded-xl bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 
                       border-2 border-dashed border-gray-300 dark:border-gray-600 mt-12 
                       flex items-center justify-center overflow-hidden">

                    {/* راهنما */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">
                            <DynamicIcon icon="drag" />
                            {content?.slider?.dragHint}
                        </div>
                    </div>

                    {/* خط‌های راهنما */}
                    <div className="flex px-2 w-full inset-0 items-center justify-between text-xs text-gray-500">
                        <span>
                            {
                                activeTab === "height"
                                    ? STANDARD_RANGES.height.min
                                    : STANDARD_RANGES.weight.min
                            }
                        </span>
                        <div className="w-4/5 h-3 mx-auto w-full rounded bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" >
                            <div
                                className="h-full bg-gradient-to-r from-blue-500/20 via-green-500 to-red-500/20 transition-all duration-200 rounded"
                                style={{ width: `${getProgressPercentage()}%` }}
                                />
                        </div>
                        {/*  */}
                        <span>
                            {activeTab === "height"
                                ? STANDARD_RANGES.height.max
                                : STANDARD_RANGES.weight.max}
                        </span>
                    </div>
                    <div className="w-full px-2 flex justify-between text-sm text-gray-500">
                        <span>{content?.slider?.min}</span>
                        <span>{content?.slider?.max}</span>
                    </div>
                </div>
            </div>

            {/* کنترل‌های دستی */}
            <div className="flex items-center justify-between">
                <button
                    onClick={decrement}
                    className="p-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 
                   hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 
                   border border-gray-300 dark:border-gray-600 transition-all active:scale-95  disabled:opacity-60 disabled:cursor-auto disabled:hover:bg-unset disabled:active:scale-100 disabled:hover:bg-gradient-to-br disabled:hover:from-gray-100 disabled:hover:to-gray-200 disabled:hover:dark:from-gray-700 disabled:hover:dark:to-gray-800"
                    disabled={isDragging || activeTab === "weight" && height === STANDARD_RANGES.height.min || activeTab === "weight" && weight === STANDARD_RANGES.weight.min}
                >
                    <DynamicIcon icon="minus" />
                </button>

                <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">
                        {content?.slider?.step || "Step"}:
                    </div>
                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {activeTab === "height"
                            ? `${STANDARD_RANGES.height.step} ${content?.units?.cm}`
                            : `${STANDARD_RANGES.weight.step} ${content?.units?.kg}`}
                    </div>
                </div>

                <button
                    onClick={increment}
                    className="p-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 
                   hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 
                   border border-gray-300 dark:border-gray-600 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-auto disabled:hover:bg-unset disabled:active:scale-100 disabled:hover:bg-gradient-to-br disabled:hover:from-gray-100 disabled:hover:to-gray-200 disabled:hover:dark:from-gray-700 disabled:hover:dark:to-gray-800"
                    disabled={isDragging || activeTab === "height" && height === STANDARD_RANGES.height.max || activeTab === "weight" && weight === STANDARD_RANGES.weight.max}
                >
                    <DynamicIcon icon="plus" />
                </button>
            </div>

            {/* توضیحات */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
                     rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                    <DynamicIcon icon="info" />
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        <strong className="text-gray-800 dark:text-white">
                            {content?.slider?.tipTitle || "Quick Tip"}:
                        </strong>{" "}
                        {activeTab === "height"
                            ? content?.slider?.heightTip || "Drag horizontally to adjust height. Average height is shown in purple."
                            : content?.slider?.weightTip || "Drag horizontally to adjust weight. BMI updates in real-time."}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BMIRange;