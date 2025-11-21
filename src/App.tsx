import Header from "./Components/HomePage/Header";
import Footer from "./Components/HomePage/Footer";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import BMICalculator from "./Components/BMICalc/BmiCalculator";
import ShapesCalculator from "./Components/ShapesCalc/ShapesCalculator";
import CurrencyConverter from "./Components/CurrencyConverter/CurrencyConverter";
import Converter from "./Components/Converter/Converter";
import InvestmentCalculator from "./Components/InvestmentCalculator/InvestmentCalculator";
import DynamicIcon from "./SVGIcons/DynamicIcon";
import { homeConfig, toolsConfig } from "./assets/configs/homeConfig";
import ToolNav from "./Components/HomePage/ToolNav";
import LinkButton from "./Components/BackButton";
import Toast from "./Components/Toast";
import { useToast } from "./Context/useToast";

const App = (): React.ReactNode => {

  const {toast} = useToast()

  return (
    <BrowserRouter>
      <Header />
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
                  {homeConfig.project.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {homeConfig.project.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md max-w-4xl mx-auto">
                  {Object.entries(toolsConfig).map(([key, tool]) => (
                    (tool.status === "active") ? (
                      <Link
                        to={tool.path}
                        className="p-4 text-white flex flex-col gap-2 items-center rounded-lg select-none [-webkit-user-drag:none] transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-slate-900 dark:to-gray-900 hover:scale-105 hover:shadow-lg w-32 active:text-blue-500"
                        key={key}
                      >
                        <DynamicIcon icon={tool.icon} />
                        <span className="text-sm font-medium text-center">{tool.title}</span>
                      </Link>
                    ) : (
                      <Link
                        to={tool.path}
                        className="opacity-50 animate-pulse p-4 text-white flex flex-col gap-2 items-center rounded-lg select-none [-webkit-user-drag:none] transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-slate-900 dark:to-gray-900 hover:scale-105 hover:shadow-lg w-32 active:text-blue-500"
                        key={key}
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
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:hover:translate-x-1 transition-translate duration-200">Page Not Found</h2>
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
