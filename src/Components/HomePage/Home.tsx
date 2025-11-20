import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom"
import Converter from "../Converter/Converter"
import CurrencyConverter from "../CurrencyConverter/CurrencyConverter"
import ShapesCalculator from "../ShapesCalc/ShapesCalculator"
import BMICalculator from "../BMICalc/BmiCalculator"
import InvestmentCalculator from "../InvestmentCalculator/InvestmentCalculator"
import { homeConfig, toolsConfig } from "../../assets/configs/homeConfig"
import DynamicIcon from "../../SVGIcons/DynamicIcon"

// کامپوننت هدر برای صفحات ابزار
const ToolNav: React.FC = () => {
    const location = useLocation();
    const currentTool = Object.values(toolsConfig).find(tool => tool.path === location.pathname);
    
    return (
        <nav className="w-full bg-gradient-to-r from-blue-600 to-purple-700 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 select-none">
                <div className="flex items-center justify-between gap-4 max-md:flex-col max-lg:flex-col">
                    <div className="flex items-center gap-4 max-md:flex-col max-lg:flex-col">
                        <Link 
                            to="/"
                            className="group flex select-none items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 fixed bottom-4 left-2 z-50 p-3 rounded-full md:static md:bg-white/20 md:hover:bg-white/30 md:rounded-lg md:px-3 md:py-2 md:text-current select-none [-webkit-user-drag:none]"
                            title="Back to Home"
                        >
                        {/* آیکون */}
                        <svg className="w-6 h-6 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        
                        {/* متن با انیمیشن */}
                        <span className="hidden md:inline group-hover:translate-x-1 transition-transform">
                            Back to Home
                        </span>
                        
                        {/* افکت پالس در موبایل */}
                        <div className="absolute -inset-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 md:hidden"></div>                        
                        </Link>

                        {currentTool && (
                            <div className="flex items-center gap-2">
                                <DynamicIcon icon={currentTool.icon} />
                                <h1 className="text-xl font-bold">{currentTool.title}</h1>
                            </div>
                        )}
                    </div>
                    
                    <div className="text-sm text-blue-200">
                        {currentTool?.description}
                    </div>
                </div>
            </div>
        </nav>
    );
};

// کامپوننت اصلی
const Home: React.FC = () => {
    return (
        <BrowserRouter>
            <main className="w-full min-h-screen bg-white dark:bg-black">
                {/* نمایش نوار ناوبری فقط در صفحات ابزار */}
                <Routes>
                    <Route path="*" element={
                        <Routes>
                            <Route path="/" element={null}/>
                            <Route path="*" element={<ToolNav />}/>
                        </Routes>
                    }/>
                </Routes>
                <div className="container mx-auto py-4 flex justify-center">
                    <Routes>
                        <Route path="/" element={
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                                    {homeConfig.project.name}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 mb-8">
                                    {homeConfig.project.description}
                                </p>
                                <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md max-w-4xl mx-auto">
                                    {Object.entries(toolsConfig).map(([key, tool]) => (
                                        <Link
                                            to={tool.path}
                                            className="p-4 text-white flex flex-col items-center rounded-lg select-none [-webkit-user-drag:none] transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-slate-900 dark:to-gray-900 hover:scale-105 hover:shadow-lg w-32 active:text-blue-500"
                                            key={key}
                                        >
                                            <DynamicIcon icon={tool.icon} />
                                            <span className="text-sm font-medium text-center">{tool.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        } />
                        
                        <Route path="/Converter" element={<Converter />} />
                        <Route path="/Currency_Converter" element={<CurrencyConverter />} />
                        <Route path="/Shape_Calculator" element={<ShapesCalculator />} />
                        <Route path="/BMI_Calculator" element={<BMICalculator />} />
                        <Route path="/Investment_Calculator" element={<InvestmentCalculator />} />
                        <Route path="*" element={
                            <div className="text-center py-12">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Page Not Found</h2>
                                <Link
                                    to="/"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        } />
                    </Routes>
                </div>
            </main>
        </BrowserRouter>
    )
}

export default Home;