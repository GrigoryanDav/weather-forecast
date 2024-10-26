import { BASE_URL, API_KEY } from "../../utils/constants";
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './index.css'


const DayForecast = () => {
    const [forecast, setForecast] = useState([])
    const { city } = useParams()

    useEffect(() => {
        fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                const dailyData = data.list.reduce((acc, reading) => {
                    const date = new Date(reading.dt * 1000).toLocaleDateString('en-EN')
                    if (!acc[date]) {
                        acc[date] = {
                            maxTemp: reading.main.temp_max,
                            minTemp: reading.main.temp_min,
                            weather: reading.weather[0],
                            date: reading.dt * 1000
                        }
                    } else {
                        acc[date].maxTemp = Math.max(acc[date].maxTemp, reading.main.temp_max);
                        acc[date].minTemp = Math.min(acc[date].minTemp, reading.main.temp_min)
                    }

                    return acc
                }, {})
                const sortedDailyData = Object.values(dailyData).sort((a, b) => a.date - b.date)
                setForecast(sortedDailyData.slice(0, 5))
            })
            .catch((error) => console.error('Error fetching forecast:', error))
    }, [city])

    return (
        <div className="home-container">
            <h2>Weather forecast in {city}</h2>
            <div className="forecast-container">
                {
                    forecast.map((day) => (
                        <Link to={`/${city}/${new Date(day.date).toLocaleDateString('en-EN', { weekday: 'long' })}`} key={day.date}>
                            <div className="day-card">
                                <h3>{new Date(day.date).toLocaleDateString('en-EN', { weekday: 'long' })}</h3>
                                <h3>{new Date(day.date).getDate()}</h3>
                                <img src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`} alt={day.weather.description} />
                                <p>Max: {Math.round(day.maxTemp)}</p>
                                <p>Min: {Math.round(day.minTemp)}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}


export default DayForecast