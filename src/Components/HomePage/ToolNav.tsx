import { Link, useLocation } from "react-router-dom";
import { toolsConfig } from "../../assets/configs/homeConfig"
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
                        <DynamicIcon icon="back" />
                        
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

export default ToolNav;