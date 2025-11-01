import Converter from "./Components/Converter/Converter";

const App = (): React.ReactNode => {  
  return(
    <section id="page" className="w-full min-h-max flex flex-col gap-4 items-center py-4 px-0 h-screen bg-white dark:bg-black">
      <Converter />
    </section>
  )
}

export default App;