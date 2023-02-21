document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form"),
          input = document.querySelector("input"),
          city = document.querySelector(".city_name_section"),
          countryName = document.querySelector(".country_name_section"),
          icon = document.querySelector(".icon"),
          main_temp = document.querySelector(".main_temp"),
          max = document.querySelector(".max"),
          min = document.querySelector(".min"),
          weatherWind = document.querySelector(".weather_wind_section"),
          weatherCase = document.querySelector(".weather_case_section"),
          error_modal = document.querySelector(".error_modal"),
          loader = document.querySelector(".loader"),
          weather_body = document.querySelector(".weather_body");


const key = '3a0862c4c18e9744a737abb33c15e5e9'

function getWeather(city_name) {
    weather_body.style.display = 'none'
    loader.style.display = 'block'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&APPID=${key}`)
        .then(res => {
            loader.style.display = 'none'
            weather_body.style.display = 'block'
            return res.json();
        })
        .then(data => {
            console.log(data)
                    const {
                        main,
                        name,
                        weather,
                        cod,
                        wind,
                        sys,
                } = data

                        if(cod >= 400) {
                            error_modal.style.transform = `translateX(${0}px)`
                            setTimeout(function() {
                                error_modal.style.transform = `translateX(${400}px)`
                            },3000)
                            input.value = ''
                        } else {
                            city.innerHTML = name 
                            icon.innerHTML = `
                            <img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="">
                            `
                            main_temp.innerHTML =  Math.round(main.temp) + '°C'
                            max.innerHTML = Math.round(main.temp_max) + '°C'
                            min.innerHTML = Math.round(main.temp_min) + '°C'
                            weatherCase.innerHTML = weather[0].main
                            weatherWind.innerHTML = Math.round(wind.speed) + " m/s"
                            countryName.innerHTML = sys.country
                            input.value = ''
                        }
                        })

        .catch(err => console.log(err))
        input.value = ''
        }
getWeather("Nukus")

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        getWeather(input.value)
    })
})