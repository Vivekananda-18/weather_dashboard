const userlocation = document.getElementById("userlocation"),
converter = document.getElementById("converter"),
weathericon = document.querySelector(".weathericon"),
temperature = document.querySelector(".temperature"),
feellike = document.querySelector(".feellike"),
description = document.querySelector(".description"),
city = document.querySelector(".city"),
Hvalue = document.getElementById("Hvalue"),
WSvalue = document.getElementById("WSvalue"),
Cvalue = document.getElementById("Cvalue"),
Pvalue = document.getElementById("Pvalue"),

weather_api_endpoint='https://api.openweathermap.org/data/2.5/weather?appid=3acef11d61668e07e23e6da74cf409cb&units=metric&q=';

function finduserlocation() {
    fetch(weather_api_endpoint + userlocation.value)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod != "" && data.cod != 200) {
                alert(data.message);
                return;
            }
            console.log(data);
            city.innerHTML = data.name + "," + data.sys.country;
            temperature.innerHTML = data.main.temp + "&deg C";
            feellike.innerHTML = "Feels like:" + data.main.feels_like;
            description.innerHTML = `<i class="fa-brands fa-cloudversify"></i> &nbsp;` + data.weather[0].description;
            weathericon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
            Hvalue.innerHTML = Math.round(data.main.humidity) + "<span>%</span>";
            WSvalue.innerHTML = Math.round(data.wind.speed) + "<span>m/s</span>";
            Pvalue.innerHTML = data.main.pressure + "<span>hpa</span>";
            Cvalue.innerHTML = data.clouds.all + "<span>%</span>";

            
            getDailyForecast(userlocation.value);
        })
         .catch(error => console.error("Current weather fetch error:", error));
}

function getDailyForecast(city) {
  const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3acef11d61668e07e23e6da74cf409cb&units=metric`;

  fetch(forecastEndpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); 

      
      const forecastContainer = document.querySelector(".forecast-container");
      forecastContainer.innerHTML = ""; 

     
      const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

      dailyForecasts.forEach(item => {
        const date = new Date(item.dt_txt).toDateString();
        const icon = item.weather[0].icon;
        const temp = item.main.temp;
        const description = item.weather[0].description;

       
        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");
        forecastCard.innerHTML = `
          <h4>${date}</h4>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
          <p>${temp} °C</p>
          <p>${description}</p>
        `;
        forecastContainer.appendChild(forecastCard);
      });
    })
    .catch(error => console.error("Forecast error:", error));
}

