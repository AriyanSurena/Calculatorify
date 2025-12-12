import { toolsConfig } from "./homeConfig";
const footerConfig = {
    project: {
        name: "Calculatorify Suite",
        description: "A comprehensive and modern suite of computational tools built with advanced web technologies.",
        status: {
            title: "active_development 🚧",
            message: "This project is under construction and not yet complete. I am actively and regularly upgrading and improving it."
        }
    },
    features: {
        available: {
            title: "🚀 Available features",
            list: Object.entries(toolsConfig).map(([, tool]) => {
                if(tool.status === 'active')
                    return tool;
            })

        },
        upcoming: {
            title: "🔜 Up Coming",
            list: Object.entries(toolsConfig).map(([, tool]) => {
                if(tool.status === 'comingSoon')
                    return tool
            })
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
            { name: "Dark Mode", icon: "🌙" },
            { name: "Responsive", icon: "📱" }
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
        description: "",
        photo: "/Creator.png",
        links: [
            {
                icon: "github",
                title: "👨‍💻 GitHub Portfolio",
                link: "https://github.com/AriyanSurena"
            },
            {
                icon: "repo",
                title: "📂 Repository Access",
                link: "https://github.com/AriyanSurena/Calculatorify.git"
            },
            {
                icon: "telegram",
                title: "📢 Development Channel",
                link: "https://t.me/SurenaIO"
            },
            {
                icon: "email",
                title: "✉️ Contact Developer",
                link: "mailto:AriyanSurena@gmail.com"
            },
            {
                icon: "twitter",
                title: "📱 Tech Twitter",
                link: "https://twitter.com/AriyanSurena"
            },
            {
                icon: "linkedin",
                title: "🤝 Professional Connect",
                link: "https://www.linkedin.com/in/ariyan-surena-09148b2b3/"
            }
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