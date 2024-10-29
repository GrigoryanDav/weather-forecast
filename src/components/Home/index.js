import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
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

    const handleSearch = () => {
        navigate(`/${inputValue}`)
    }

    return (
        <div className="home_container">
            <h2>Write the name of the city and find out the weather there for the next 5 days</h2>
            <input 
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            />
            <button onClick={handleSearch}>
                Search
            </button>
        </div>
    )
}


export default Home