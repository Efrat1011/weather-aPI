const apiKey = 'e3ad77404dc88bee59f4a50942c3dbc6'; 
const cities = ['Алматы', 'Астана', 'Шымкент'];

let selectedBtn= document.getElementById('selected-btn')
let selectedContainer = document.querySelector('.selected-weather')
let weatherContainer = document.querySelector('.weather-container')
let btnSearch = document.getElementById('btns-search')
weatherContainer.style.display = "none"
btnSearch.addEventListener('click',async function(){
    let search = document.getElementById('search').value
      selectedContainer.textContent = ''
        weatherContainer.style.display = 'none'
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error('New error')
        }
         let data = await response.json()

         let div = document.createElement('div')
         div.className ='qorap'
         div.innerHTML = `
                <h2 id="city1">${data.name}</h2>
                <p class="temperature" id="temp1">${Math.round(data.main.temp)}°C</p>
                <p><img id="icon1" class="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Иконка"> <span id="desc1">${data.weather[0].description}</span></p>
                <p id="humidity1">Влажность: ${data.main.humidity}%</p>
                <p id="wind1">Ветер: ${data.wind.speed} м/с</p>
            `
        selectedContainer.appendChild(div)

    }catch(err){
        console.log(err);
        
    }
})

selectedBtn.addEventListener('click',async function(){
        let city = "Almaty"
        weatherContainer.style.display = 'none'
        selectedContainer.textContent = ''

        try{
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

            if(!response.ok){
                throw new Error('New error')
            }

            let data = await response.json()

            let div = document.createElement('div')
            div.className = 'weather-card'

            div.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>🌡 Температура: ${data.main.temp}°C</p>
                <p>☁ Күйі: ${data.weather[0].description}</p>
                <p>💨 Жел жылдамдығы: ${data.wind.speed} м/с</p>
                <p>💧 Ылғалдылық: ${data.main.humidity}%</p>
            `

            selectedContainer.appendChild(div)
        }catch(err){
            console.error(err);
        }
})


async function getWeather(city, index) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    weatherContainer.style.display = "flex"
    selectedContainer.textContent = ''
    try {
        let response = await fetch(url);
        let data = await response.json();

        document.getElementById(`city${index}`).textContent = data.name;
        document.getElementById(`temp${index}`).textContent = `🌡 Температура: ${Math.round(data.main.temp)}°C`;
        document.getElementById(`desc${index}`).textContent = data.weather[0].description;
        document.getElementById(`humidity${index}`).textContent = `💧 Ылғалдылық: ${data.main.humidity}%`;
        document.getElementById(`wind${index}`).textContent = `💨 Жел жылдамдығы: ${data.wind.speed} м/с`;
        document.getElementById(`icon${index}`).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

let btnKZ = document.getElementById('btnKZ')

btnKZ.addEventListener('click',()=>{
    cities.forEach((city, index) => getWeather(city, index + 1))
})