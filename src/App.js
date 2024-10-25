import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import DayForecast from "./components/DayForecast";
import HourlyForecast from "./components/HourlyForecast";
import './styles/global.css'


const App = () => {
  return (
    <div>
      <RouterProvider
        router={
          createBrowserRouter(
            createRoutesFromElements(
              <>
                <Route path="/" element={<DayForecast />} />
                <Route path="/:day" element={<HourlyForecast />} />
              </>
            )
          )
        }
      />
    </div>
  );
}

export default App;
