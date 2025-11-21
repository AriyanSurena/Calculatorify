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
        icon: "unitConverter",
        title: "Unit Converter",
        path: "/Converter",
        description: "Convert between various measurement units",
        status: "active",
    },
    shapeCalculator: {
        // icon: "📐",
        icon: "shapeCalculator",
        title: "Shape Calculator", 
        path: "/Shape_Calculator",
        description: "Calculate area, perimeter and geometry measurements",
        status: "active",
    },
    bmiCalculator: {
        // icon: "⚖️",
        icon: "bmiCalculator",
        title: "BMI Calculator",
        path: "/BMI_Calculator", 
        description: "Calculate Body Mass Index and health metrics",
        status: "active",
    },
    currencyConverter: {
        // icon: "💱",
        icon: "currencyConverter",
        title: "Currency Converter",
        path: "/Currency_Converter",
        description: "Real-time currency exchange rates and conversion",
        status: "active",
    },
    investmentCalculator: {
        // icon: "📈",
        icon: "investmentCalculator",
        title: "Investment Calculator",
        path: "/Investment_Calculator",
        description: "Calculate investment returns and compound interest",
        status: "active"
    },
    // ابزارهای آینده
    volumeCalculator: {
        icon: "🧊",
        title: "Volume Calculator",
        path: "/Volume_Calculator",
        description: "Calculate 3D shapes volume and capacity",
        status: "comingSoon"
    },
    interestCalculator: {
        icon: "💰",
        title: "Interest Calculator", 
        path: "/Interest_Calculator",
        description: "Calculate loan interest and savings growth",
        status: "comingSoon"
    },
    dateCalculator: {
        icon: "📅",
        title: "Date Calculator",
        path: "/Date_Calculator",
        description: "Calculate date differences and durations",
        status: "comingSoon"
    },
    forexCalculator: {
        icon: "🌍",
        title: "Forex Calculator",
        path: "/Forex_Calculator", 
        description: "Foreign exchange and trading calculations",
        status: "comingSoon"
    },
    mathCalculator: {
        icon: "🧮",
        title: "Math Calculator",
        path: "/Math_Calculator",
        description: "Basic to advanced mathematical operations",
        status: "comingSoon"
    },
    percentageCalculator: {
        icon: "📊",
        title: "Percentage Calculator",
        path: "/Percentage_Calculator",
        description: "Calculate percentages, discounts and increases",
        status: "comingSoon"
    },
    ageCalculator: {
        icon: "🎂",
        title: "Age Calculator",
        path: "/Age_Calculator",
        description: "Calculate exact age and time differences",
        status: "comingSoon"
    }
} as const;

export type ToolKey = keyof typeof toolsConfig;
export type ToolConfig = typeof toolsConfig[ToolKey];