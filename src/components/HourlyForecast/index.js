import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { BASE_URL, API_KEY } from "../../utils/constants"
import './index.css'



const HourlyForecast = () => {
    const { day, city } = useParams()
    const [hourForecast, setHourForecast] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            const hourlyData = data.list.filter((reading) => new Date(reading.dt * 1000).toLocaleDateString('en-EN', { weekday: 'long' }) === day)
            setHourForecast(hourlyData)
        })
        .catch((error) => console.error('Failed to fetch forecast:', error));
    }, [day, city])

    return (
            <div className="hourly-forecast-container">
                <h2>Hourly weather for {day} in {city}</h2>
                <div className="hourly-cards">
                    {
                        hourForecast.map((reading) => (
                            <div className="hour-card" key={reading.dt}>
                                <img src={`https://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`}  alt={reading.weather[0].description} />
                                <h3>{new Date(reading.dt * 1000).toLocaleTimeString('en-EN', { hour: '2-digit', minute: '2-digit' })}</h3>
                                <p>Temperature: {Math.round(reading.main.temp)}°C</p>
                            </div> 
                        ))
                    }
                </div>
                <Link to={`/${city}`}><button>Back to the Main</button></Link>
            </div>
    )
}


export default HourlyForecast