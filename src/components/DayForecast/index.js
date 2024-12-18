import React, { useEffect, useState } from 'react';
import { API_KEY, BASE_URL } from '../../utils/constants';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './index.css'


const DayForecast = () => {
    const [forecast, setForecast] = useState([]);
    const { city } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                const dailyData = data.list.reduce((acc, reading) => {
                    // Convert the timestamp to a readable date (DD/MM/YYYY)
                    const date = new Date(reading.dt * 1000).toLocaleDateString('en-EN');
                    if (!acc[date]) {
                        acc[date] = {
                            maxTemp: reading.main.temp_max,
                            minTemp: reading.main.temp_min,
                            weather: reading.weather[0],
                            date: reading.dt * 1000,
                        };
                    } else {
                        acc[date].maxTemp = Math.max(acc[date].maxTemp, reading.main.temp_max);
                        acc[date].minTemp = Math.min(acc[date].minTemp, reading.main.temp_min);
                    }

                    return acc;
                }, {})

                const sortedDailyData = Object.values(dailyData).sort((a, b) => a.date - b.date);
                setForecast(sortedDailyData.slice(0, 5));
            })
            .catch((error) => console.error('Error fetching forecast:', error));
    }, [city]);

    const handleBackClick = () => {
        navigate('/')
    }

    return (
        <div className='forecast-page-container'>
            <h2>Weather in {city}</h2>
        <div className="forecast-container">
            {forecast.map((day) => (
                <Link to={`/${city}/${new Date(day.date).toLocaleDateString('en-EN', { weekday: 'long' })}`} key={day.date}>
                    <div className="day-card">
                        <h3>{new Date(day.date).toLocaleDateString('en-EN', { weekday: 'long' })}</h3>
                        <h3>{new Date(day.date).getDate()}</h3>
                        <img src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`} alt={day.weather.description} />
                        <p>Max: {Math.round(day.maxTemp)}°C</p>
                        <p>Min: {Math.round(day.minTemp)}°C</p>
                    </div>
                </Link>
            ))}
        </div>
        <button onClick={handleBackClick}>Back to the Home</button>
        </div>
    );
}

export default DayForecast;
