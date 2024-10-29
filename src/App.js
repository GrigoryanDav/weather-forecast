import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import { createContext, useState } from 'react'
import DayForecast from './components/DayForecast'
import HourlyForecast from './components/HourlyForecast'
import Home from './components/Home'
import './styles/global.css'



const AppContext = createContext()

const App = () => {
  const [citySelected, setCitySelected] = useState(false)

  return (
    <div>
      <AppContext.Provider value={{ citySelected, setCitySelected }}>
        <RouterProvider
          router={
            createBrowserRouter(
              createRoutesFromElements(
                <>
                  <Route path='/' element={<Home onCitySelect={() => setCitySelected(true)} />} />
                  <Route path='/:city' element={ citySelected ? <DayForecast /> : <Navigate to='/' replace />} />
                  <Route path='/:city/:day' element={ citySelected ? <HourlyForecast /> : <Navigate to='/' replace />} />
                </>
              )
            )
          }
        />
      </AppContext.Provider>
    </div>
  );
}

export default App;
