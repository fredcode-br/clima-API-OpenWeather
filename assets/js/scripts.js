const apikey = "5699ef8b19dfd132b21a13504d4053f2";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const sugestions = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");
const errorMessage = document.querySelector("#error-message");

const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
};

const shouWeatherData = async(city) => {
    const data =  await getWeatherData(city);
    if(data.cod == 404){
        errorMessage.classList.remove("hide");
        sugestions.classList.add("hide");
        weatherContainer.classList.add("hide");
    }else {
        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`)
        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}Km/h`;

        weatherContainer.classList.remove("hide");
        sugestions.classList.add("hide");
        errorMessage.classList.add("hide");
    }
};


searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value;
    shouWeatherData(city);     
});

cityInput.addEventListener("keyup", (e) =>  {
    if(e.code === "Enter") {
        const city = cityInput.value;
        shouWeatherData(city); 
    }
});

suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
      shouWeatherData(city);
    });
});
  