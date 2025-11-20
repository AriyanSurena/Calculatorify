const footerConfig = {
    project: {
        name: "Calculatorify Suite",
        description: "A comprehensive and modern suite of computational tools built with advanced web technologies.",
        status: "active_development 🚧"
    },
    features: {
        available: {
            title: "🚀 Available features",
            list: [
                "Unit Converter",
                "Area & Perimeter Calculator",
                "BMI Calculator",
                "Currency Converter",
                "Investment Calculator"
            ]
        },
        upcoming: {
            title: "🔜 Up Coming", 
            list: [
                "Volume Calculator",
                "Interest Rate Calculator",
                "Date Calculator",
                "Forex Calculator"
            ]
        }
    },
    technologies: {
        title: "🛠️ Tech Stack & Status",
        list: [
            { name: "Vite", icon: "⚡" },
            { name: "React 18", icon: "⚛️" },
            { name: "TypeScript", icon: "📘" },
            { name: "React Router", icon: "🛣️" },
            { name: "Tailwind CSS", icon: "🎨" },
            { name: "Dark Mode", icon: "🌙" }
        ]
    },
    projectBenefits: {
        title: "💡 Why This Project?",
        benefits: [
            {
                icon: "🎯",
                title: "All-in-One Solution",
                description: "No need for multiple calculator apps - everything in one place"
            },
            {
                icon: "⚡",
                title: "Modern & Fast",
                description: "Built with the latest web technologies for optimal performance"
            },
            {
                icon: "👥",
                title: "User-Friendly",
                description: "Intuitive interface and smooth user experience"
            },
            {
                icon: "🔓",
                title: "Open Source",
                description: "Transparent and community-driven development"
            }
        ]
    },
    creator: {
        title: "👨‍💼 About Creator & Links",
        name: "Ariyan Surena",
        links: [
            {
                icon: "github",
                title: "GitHub Profile",
                link: "https://github.com/AriyanSurena"
            },
            {
                icon: "repo",
                title: "GitHub Repo",
                link: "https://github.com/AriyanSurena/Calculator.git"
            },
            {
                icon: "telegram",
                title: "GitHub Repo",
                link: "https://github.com/AriyanSurena/Calculator.git"
            },
            {
                icon: "instagram",
                title: "GitHub Repo",
                link: "https://github.com/AriyanSurena/Calculator.git"
            },
            {
                icon: "repo",
                title: "GitHub Repo",
                link: "https://github.com/AriyanSurena/Calculator.git"
            },
            {
                icon: "website",
                title: "GitHub Repo",
                link: "https://github.com/AriyanSurena/Calculator.git"
            },
            {
                icon: "email",
                title: "GitHub Repo",
                link: "https://github.com/AriyanSurena/Calculator.git"
            },
            {
                icon: "discord",
                title: "GitHub Repo",
                link: "https://github.com/AriyanSurena/Calculator.git"
            },
            {
                icon: "linkedin",
                title: "GitHub Repo",
                link: "https://github.com/AriyanSurena/Calculator.git"
            },
        ]
    },
    keywords: [
        "Calculator", "Unit Converter", "React", "TypeScript",
        "Online Tools", "Computations", "Web Application"
    ],
    copyright: {
        text: "© {year} Calculatorify Suite. Built with Passion and React",
        subText: "Our goal is to create the most comprehensive computational tools suite"
    }
} as const;

export default footerConfig;