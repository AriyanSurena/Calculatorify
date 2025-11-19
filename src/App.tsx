import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Converter from "./Components/Converter/Converter";
import ShapesCalculator from "./Components/ShapesCalc/ShapesCalculator";
import BMICalculator from "./Components/BMICalc/BmiCalculator";
import InvestmentCalculator from "./Components/InvestmentCalculator/InvestmentCalculator";
import CurrencyConverter from "./Components/CurrencyConverter/CurrencyConverter";
import Header from "./Components/HomePage/Header";
import Footer from "./Components/HomePage/Footer";

const App = (): React.ReactNode => {
  return (
    <>
      <Header />
      <main className="w-full min-h-max flex flex-col gap-4 items-center py-4 px-0 h-screen bg-white dark:bg-black">
        <BrowserRouter>
          <nav className="flex flex-wrap mx-4 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <Link
              to={'/Converter'}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >Converter</Link>
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
            <Route path="/Converter" element={<Converter />} />
            <Route path="/Currency_Converter" element={<CurrencyConverter />} />
            <Route path="/Shape_Calculator" element={<ShapesCalculator />} />
            <Route path="/BMI_Calculator" element={<BMICalculator />} />
            <Route path="/Investment_Calculator" element={<InvestmentCalculator />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  )
}

export default App;