import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Converter from "./Components/Converter/Converter";
import ShapesCalculator from "./Components/ShapesCalc/ShapesCalculator";
import TextChip from "./Components/TextChlip";
import BMICalculator from "./Components/BMICalc/BmiCalculator";
import InvestmentCalculator from "./Components/InvestmentCalculator/InvestmentCalculator";
import CurrencyConverter from "./Components/CurrencyConverter/CurrencyConverter";

const App = (): React.ReactNode => {
  return (
    <section id="page" className="w-full min-h-max flex flex-col gap-4 items-center py-4 px-0 h-screen bg-white dark:bg-black">
      <TextChip>
        {'This project is under construction and is not yet complete. GitHub link: '}
        <a href="https://github.com/AriyanSurena/Calculator.git" target="_blank" rel="noopener noreferrer" className="text-blue-400">
          https://github.com/AriyanSurena/Calculator.git
        </a>
      </TextChip>
      <BrowserRouter>
        <nav className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <Link
            to={'Convertor'}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >Convertor</Link>
          <Link
            to={'Shape_Calculator'}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >Shape Calculator</Link>
          <Link
            to={'BMI_Calculator'}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >BMI Calculator</Link>
          <Link
            to={'Currency_Converter'}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >Currency Converter</Link>
          <Link
            to={'Investment_Calculator'}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >Investment Calculator</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/Convertor" element={<Converter />} />
          <Route path="/Currency_Converter" element={<CurrencyConverter />} />
          <Route path="/Shape_Calculator" element={<ShapesCalculator />} />
          <Route path="/BMI_Calculator" element={<BMICalculator />} />
          <Route path="/Investment_Calculator" element={<InvestmentCalculator />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App;