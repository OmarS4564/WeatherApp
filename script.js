const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function getWeather(city) {
  const apiKey = "eee9f3795e34c551425a3812256214d9";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
  const weatherIcon = document.querySelector(".weatherIcon");  
  
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var weatherJson = await response.json();

    var weatherType = "";
    if(weatherJson.weather && weatherJson !== undefined) {
      weatherType = weatherJson.weather[0].main;
    
      document.querySelector(".city").innerHTML = weatherJson.name;
      document.querySelector(".humidity").innerHTML = weatherJson.main.humidity + "%";
      document.querySelector(".type").innerHTML = weatherType;
      document.querySelector(".temp").innerHTML = Math.round(weatherJson.main.temp) + "°F";
      document.querySelector(".wind").innerHTML = Math.round(weatherJson.wind.speed) + " mph";

      switch (weatherType) {
        case "Clouds":
          weatherIcon.src = "WeatherIcons/clouds.png";
          break;
        case "Rain":
          weatherIcon.src = "WeatherIcons/rain.png";
          break;
        case "Clear":
          weatherIcon.src = "WeatherIcons/clear.png";
          break;
        case "Drizzle":
          weatherIcon.src = "WeatherIcons/drizzle.png";
          break;
        case "Mist":
          weatherIcon.src = "WeatherIcons/mist.png";
          break;
        case "Snow":
          weatherIcon.src = "WeatherIcons/snow.png";
          break;
        case "Thunderstorm":
          weatherIcon.src = "WeatherIcons/thunderstorm.png";
          break;
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } 
}

searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getWeather(searchBox.value);
    }
});

getWeather();
