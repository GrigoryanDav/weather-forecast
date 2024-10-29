import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import DayForecast from './components/DayForecast'
import HourlyForecast from './components/HourlyForecast'
import Home from './components/Home'
import './styles/global.css'


const App = () => {
  return (
    <div>
      <RouterProvider
        router={
          createBrowserRouter(
            createRoutesFromElements(
              <>
                <Route path='/' element={<Home />} />
                <Route path='/:city' element={<DayForecast />} />
                <Route path='/:city/:day' element={<HourlyForecast />} />
              </>
            )
          )
        }
      />
    </div>
  );
}

export default App;
