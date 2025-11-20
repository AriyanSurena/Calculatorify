export const homeConfig = {
    project: {
        name: "Calculatorify Suite",
        description: "A comprehensive and modern suite of computational tools built with advanced web technologies.",
        status: "active_development 🚧"
    },
}

export const toolsConfig = {
    unitConverter: {
        // icon: "🔄",
        icon: "UnitConverter",
        title: "Unit Converter",
        path: "/Converter",
        description: "Convert between various measurement units"
    },
    shapeCalculator: {
        // icon: "📐",
        icon: "ShapeCalculator",
        title: "Shape Calculator", 
        path: "/Shape_Calculator",
        description: "Calculate area, perimeter and geometry measurements"
    },
    bmiCalculator: {
        // icon: "⚖️",
        icon: "BMICalculator",
        title: "BMI Calculator",
        path: "/BMI_Calculator", 
        description: "Calculate Body Mass Index and health metrics"
    },
    currencyConverter: {
        // icon: "💱",
        icon: "CurrencyConverter",
        title: "Currency Converter",
        path: "/Currency_Converter",
        description: "Real-time currency exchange rates and conversion"
    },
    investmentCalculator: {
        // icon: "📈",
        icon: "InvestmentCalculator",
        title: "Investment Calculator",
        path: "/Investment_Calculator",
        description: "Calculate investment returns and compound interest"
    },
    // ابزارهای آینده
    // volumeCalculator: {
    //     icon: "🧊",
    //     title: "Volume Calculator",
    //     path: "/Volume_Calculator",
    //     description: "Calculate 3D shapes volume and capacity",
    //     comingSoon: true
    // },
    // interestCalculator: {
    //     icon: "💰",
    //     title: "Interest Calculator", 
    //     path: "/Interest_Calculator",
    //     description: "Calculate loan interest and savings growth",
    //     comingSoon: true
    // },
    // dateCalculator: {
    //     icon: "📅",
    //     title: "Date Calculator",
    //     path: "/Date_Calculator",
    //     description: "Calculate date differences and durations",
    //     comingSoon: true
    // },
    // forexCalculator: {
    //     icon: "🌍",
    //     title: "Forex Calculator",
    //     path: "/Forex_Calculator", 
    //     description: "Foreign exchange and trading calculations",
    //     comingSoon: true
    // },
    // mathCalculator: {
    //     icon: "🧮",
    //     title: "Math Calculator",
    //     path: "/Math_Calculator",
    //     description: "Basic to advanced mathematical operations",
    //     comingSoon: true
    // },
    // percentageCalculator: {
    //     icon: "📊",
    //     title: "Percentage Calculator",
    //     path: "/Percentage_Calculator",
    //     description: "Calculate percentages, discounts and increases",
    //     comingSoon: true
    // },
    // ageCalculator: {
    //     icon: "🎂",
    //     title: "Age Calculator",
    //     path: "/Age_Calculator",
    //     description: "Calculate exact age and time differences",
    //     comingSoon: true
    // }
} as const;

export type ToolKey = keyof typeof toolsConfig;
export type ToolConfig = typeof toolsConfig[ToolKey];