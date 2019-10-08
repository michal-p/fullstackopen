import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Forecast = ({location}) => {
  const [forecast, setForecast] = useState()
  const accessKey = 'a0a4841722ea35215f866af73f2c7eaf'

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${location}`)
      .then( response =>  {
        setForecast(response.data)
      })
  }, [])

  if(forecast) {
    return (
      <>
        <h1>Weather in {location}</h1>
        <p><b>temperature:</b> {forecast.current.temperature} Celsius</p>
        <img alt={`temperature pictogram ${forecast.current.weather_descriptions}`} src={forecast.current.weather_icons[0]} />
        <p><b>wind:</b> {forecast.current.wind_speed} direction: {forecast.current.wind_dir}</p>
      </>
    )
  } else {
    return <p>Forecast is loading!</p>
  }
}

export default Forecast