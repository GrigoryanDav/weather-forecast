import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { BASE_URL, API_KEY } from "../../utils/constants"
import './index.css'



const Home = () => {
    const { city } = useParams()
    const [inputValue, setInputValue] = useState(city || '')
    const navigate = useNavigate()

    useEffect(() => {
        setInputValue(city || '')
    }, [city])

    const handleInputChange = (e) => {
        setInputValue(e.target.value.trim())
    }

    const checkCityExists = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/weather?q=${inputValue}&appid=${API_KEY}`
            )
            if(response.ok) {
                navigate(`/${inputValue}`)
            } else {
                alert("City not found. Please enter a valid city name.")
            }
        } catch (error) {
            console.error("Error checking city:", error)
            alert(`"An error occurred. Please try again later."`)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            checkCityExists()
        }
    }

    return (
        <div className="home_container">
            <h2>Write the name of the city and find out the weather there for the next 5 days</h2>
            <input
                type="text"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                placeholder="Enter city name"
            />
            <button onClick={checkCityExists}>
                Search
            </button>
        </div>
    )
}


export default Home