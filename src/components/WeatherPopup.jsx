import React, { useEffect, useState } from 'react';
import './WeatherPopup.css';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';

const WeatherPopup = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDate, setCurrentDate] = useState(''); 

  const fetchWeather = async (query) => {
    try {
      const apiKey = '028fd6f2e3b5c7c2ff1a66ac9bba2054'; // Replace with your API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setError(null);
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather(`q=${city}`);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`lat=${latitude}&lon=${longitude}`);
        },
        (error) => {
          setError("Location permission denied");
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
    }
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString(undefined, options));
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };


  return (
    <div className="container">
    <div className="weather-popup">
      <h2>Weather Extension</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter city name" required
      />
      <button onClick={handleSearch} type='submit'>
        Search
      </button>
      {error && <p>{error}</p>}
      {weather ? (
        <div className="slider-details">
          <input type="radio" name="slider" id="slide1" checked={currentSlide === 0} readOnly />
          <input type="radio" name="slider" id="slide2" checked={currentSlide === 1} readOnly />
          <input type="radio" name="slider" id="slide3" checked={currentSlide === 2} readOnly />
          <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="slide slide_1">
              <div className="slide-content">
    
                <h1>{weather.main.temp} °C</h1>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt={weather.weather[0].description}
                />
                <p>{weather.weather[0].description}</p>
                <h3><img
                    src="https://img.icons8.com/ios-filled/50/000000/marker.png"
                    alt="location icon"
                    className="location-icon"
                  />
                  {weather.name}</h3>
                  <p>{currentDate}</p>
              </div>
            </div>
            <div className="slide slide_2">
              <div className="slide-content">
                <img src={humidity} alt="humidity" className='icon'/>
                <h1>{weather.main.humidity}%</h1>
                <h4>Humidity</h4>
              </div>
            </div>
            <div className="slide slide_3">
              <div className="slide-content">
                <img src={wind} alt="wind" className='icon'/>
                <h1>{weather.wind.speed}<br/>km/h</h1>
                <h4>Wind speed</h4>
              </div>
            </div>
          </div>
          <div className="controls">
            <label htmlFor="slide1"></label>
            <label htmlFor="slide2"></label>
            <label htmlFor="slide3"></label>
          </div>
          <div className="arrow arrow-right" onClick={nextSlide}>&#8594;</div>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default WeatherPopup;