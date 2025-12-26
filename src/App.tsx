import { useEffect } from "react";
import { useConfig } from "./hooks/useProjectConfig";
import useToast from "./hooks/useToast";
import useLanguage from "./hooks/useLanguage";
import type { Languages } from "./context/language/language.types";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./pages/navigation/Header";
import Footer from "./pages/navigation/Footer";
import BMICalculator from "./components/BMICalculator/BMICalculator";
import ShapesCalculator from "./components/ShapesCalculator/ShapesCalculator";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Converter from "./components/Converter/Converter";
import InvestmentCalculator from "./components/InvestmentCalculator/InvestmentCalculator";
import DynamicIcon from "./components/svgIcons/DynamicIcon";
import ToolNav from "./pages/navigation/ToolNav";
import LinkButton from "./components/common/BackButton";
import Toast from "./components/common/Toast";
import FontDirectionManager from "./context/language/direction";

const App = (): React.ReactNode => {
  const { toast } = useToast()
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    switch (language) {
      case "en-US": {
        document.documentElement.style.direction = "ltr"
      } break;
      case "fa-IR": {
        document.documentElement.style.direction = "rtl"
        document.documentElement.classList.add('.persian-numbers')
      } break;
    }
    document.documentElement.style.fontFamily = language.startsWith('fa') ? 'Vazir' : 'Jost';

    return () => {
      document.documentElement.classList.remove('.persian-numbers')
    }
  }, [language])

  const config = useConfig();
  return (
    <BrowserRouter>
      <FontDirectionManager />
      <Header />
      <nav className="w-full flex justify-end p-4 dark:bg-slate-700">
        <div className="animate-fadeIn">
          <div className="relative inline-block">
            <select
              value={language}
              onChange={(e) => {
                setLanguage(
                  ((e.target.value as unknown) as Languages)
                )
              }
              }
              className="
                bg-transparent
                py-2
                pl-8
                pr-4
                text-sm
                font-medium
                text-gray-700
                dark:text-gray-200
                border-0
                border-b-2
                border-gray-300
                dark:border-gray-600
                hover:border-blue-500
                dark:hover:border-blue-400
                focus:outline-none
                focus:ring-0
                focus:border-blue-500
                transition-colors
                duration-200
                cursor-pointer
                appearance-none
              "
              aria-label="Select language"
            >
              <option value="en-US">EN</option>
              <option value="fa-IR">FA</option>
            </select>

            {/* آیکون زمین */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </nav>
      <main className="w-full bg-white dark:bg-black">
        {/* نمایش نوار ناوبری فقط در صفحات ابزار */}
        <Routes>
          <Route path="*" element={
            <Routes>
              <Route path="/" element={null} />
              <Route path="*" element={<ToolNav />} />
            </Routes>
          } />
        </Routes>
        <div className="container mx-auto pt-12 pb-16 flex justify-center">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                  {config.project.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {config.project.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md max-w-4xl mx-auto">
                  {Object.entries(config.tools).map(([toolKey, tool]) => (
                    (tool.status === "active") ? (
                      <Link
                        to={tool.path}
                        className="p-4 text-white flex flex-col gap-2 items-center rounded-lg select-none [-webkit-user-drag:none] transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-slate-900 dark:to-gray-900 hover:scale-105 hover:shadow-lg w-32 active:text-blue-500"
                        key={toolKey}
                      >
                        <DynamicIcon icon={tool.icon} />
                        <span className="text-sm font-medium text-center">{tool.title}</span>
                      </Link>
                    ) : (
                      <Link
                        to={tool.path}
                        className="opacity-50 animate-pulse p-4 text-white flex flex-col gap-2 items-center rounded-lg select-none [-webkit-user-drag:none] transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-slate-900 dark:to-gray-900 hover:scale-105 hover:shadow-lg w-32 active:text-blue-500"
                        key={toolKey}
                      >
                        <DynamicIcon icon={tool.icon} />
                        <span className="text-sm font-medium text-center">{tool.title}</span>
                      </Link>
                    )
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
                <LinkButton to="/" icon="back" title="Page Not Found" className="bg-red-500 hover:bg-red-600 text-gray-800 dark:text-white bg-red-800 hover:bg-red-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:hover:translate-x-1 transition-translate duration-200">{config.common.pageNotFound}</h2>
                </LinkButton>
              </div>
            } />
          </Routes>
        </div>
      </main>
      <Footer />
      {
        toast ? (
          <Toast type={toast?.type} key={toast?.message} duration={toast?.duration} message={toast?.message} />
        ) : null
      }
    </BrowserRouter>
  )
}

export default App;
