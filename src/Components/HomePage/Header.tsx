import { GitHubIcon } from "../../SVGIcons/Icons";

const Header: React.FC = () => {
    return (
        <header className="w-full bg-gradient-to-r from-blue-600 to-purple-700 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* بخش عنوان و توضیحات */}
                    <div className="flex flex-col text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                            🛠️ Ariyan's Tools
                            <span className="text-sm bg-yellow-500 text-black px-2 py-1 rounded-full select-none">
                                Beta
                            </span>
                        </h1>
                        <p className="text-blue-100 dark:text-gray-300 mt-1">
                            A set of practical tools for everyday calculations
                        </p>
                    </div>

                    {/* بخش اطلاعات و navigation */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* اطلاعات پروژه */}
                        <div className="flex items-center gap-3 text-sm">
                            <a
                                href="https://github.com/AriyanSurena/Calculatorify.git"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 bg-black/30 hover:bg-black/50 px-3 py-2 rounded-lg transition-colors"
                            >
                                <GitHubIcon />
                                GitHub
                            </a>

                            <div className="hidden md:flex items-center gap-1 bg-green-500/30 px-3 py-2 rounded-lg">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                Online
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;