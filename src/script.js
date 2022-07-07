// "use strict";

const citySearchBtn = document.getElementById('citySearch');
const key = 'ab47fe06eff82e2f2b9161aca8ec887f';
const cityInput = document.querySelector(".cityInfo_h1");
const icon = document.getElementById("weatherLogo");
const cityTemp = document.querySelector(".cityTemp");
const descrInput = document.querySelector('.weatherDescription');
const feelLikeInput = document.querySelector('.feel_like');
const visibilityInput = document.querySelector('.visibility');
const flag = document.querySelector('.countryFlag');
const wind = document.querySelector('.wind_stats');
const humidity = document.querySelector('.humidity_stats');
const direction = document.querySelector('.direction_stats');
const dailyInfo = document.querySelector('.extra_daily_info');
const container = document.querySelector('#container');


const graphBtn = document.getElementById("showGraphBtn");
const graphLine = document.getElementById("lineChart");
const closeBtn = document.getElementById("closeChartBtn");

let myChart =null;

function fetchCityInfo(){ 
    const cityName = document.querySelector('.city_name').value;
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
    
    fetch(API)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        else{
            throw new Error(response.status);
        }
    })
    .then(data => {
            let iconId = data['weather'][0]['icon'];
            icon.src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
            cityInput.textContent = `${data['name']}, ${data['sys']['country']}`;
            const temp = `${data['main']['temp']}`;
            cityTemp.textContent = `${temp.slice(0,2)} °C`;
            descrInput.textContent = `Description: ${data['weather'][0]['description']}`;
            feelLikeInput.textContent = `Feels like : ${data['main']['feels_like']} °C`;
            visibilityInput.textContent = `Visibility : ${data['visibility']/1000} km`;
            wind.textContent = `Wind : ${(data['wind']['speed'])} km/h`;
            humidity.textContent = `Humidity: ${(data['main']['humidity'])} %`;
            direction.textContent = `${findWindDirection(data['wind']['deg'])}`;
            document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${cityName}')`
            dailyInfo.style.display = 'flex';
            graphBtn.style.display = 'block';

            window.localStorage.setItem('lat', data['coord']['lat']);
            window.localStorage.setItem('lon', data['coord']['lon']);
          
        
    })
    .catch(error =>{
        if (cityName === ""){
            alert("Please include city name!");
        }
        else if(error.message == 404){
            alert('City not found. Please include correct city name');
        }
    }) 
}
citySearchBtn.addEventListener("click", fetchCityInfo);

window.onload = showGraph;
function showGraph(){
    console.log("graphBtn called")
    let lat = localStorage.getItem('lat');
    let lon = localStorage.getItem('lon');
    graphLine.style.display = 'block';
    graphLine.style.backgroundColor = 'white';
    container.style.display = 'none'
    hourlyAPICall(lat, lon);
}
graphBtn.addEventListener("click", showGraph);


function findWindDirection(temp){
    if (temp >=350 && temp <= 350){
        return 'N';
    }
    else if (temp >=20 && temp <= 30){
        return 'N/NE';
    }
    else if (temp >=40 && temp <= 50){
        return 'NE';
    }
    else if (temp >=60 && temp <= 70){
        return 'E/NE';
    }
    else if (temp >=80 && temp <= 100){
        return 'E';
    }
    else if (temp >=110 && temp <= 120){
        return 'E/SE';
    }
    else if (temp >=130 && temp <= 140){
        return 'SE';
    }
    else if (temp >=150 && temp <= 160){
        return 'S/SE';
    }
    else if (temp >160 && temp < 200){
        return 'S';
    }
    else if (temp >160 && temp < 200){
        return 'S';
    }
    else if (temp >=200 && temp <= 210){
        return 'S/SW';
    }
    else if (temp >=220 && temp <= 230){
        return 'SW';
    }
    else if (temp >=240 && temp <= 250){
        return 'W/SW';
    }
    else if (temp >=260 && temp <= 280){
        return 'W';
    }
    else if (temp >=290 && temp <= 300){
        return 'W/NW';
    }
    else if (temp >=310 && temp <= 320){
        return 'NW';
    }
    else if (temp >=330 && temp <= 340){
        return 'N/NW';
    }
    else{
        return 'NA';
    }
    
}



function hourlyAPICall(lat, lon){
    const hourlyAPI = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
    fetch(hourlyAPI)
    .then(response =>{
        if (response.ok){
            return response.json();
        }
        else{
            throw new Error(response.status);
        }
    })
    .then(data=>{
        lineGraph(data);

    })
    .catch(error=>{
        console.log('fcked' + error);
    }
    )
}

function lineGraph(data) {

    const labels = [];
    for (let index = 0; index < 24; index++) {
        labels.push((data['hourly']['time'][index].slice(11)));
    }
  
    const stats = {
      labels: labels,
      datasets: [{
        label: 'Hourly Weather Cart',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [],
      }]
    };

    for (let index = 0; index < 24; index++) {
        stats['datasets'][0]['data'].push(data['hourly']['temperature_2m'][index]);
    }
    
  
    const config = {
      type: 'line',
      data: stats,
      options: {}
    };

    if (myChart != null){
        myChart.destroy();
    }

    myChart = new Chart(
      document.getElementById('myChart'),
      config
    ); 

    window.localStorage.setItem("chart", myChart);    
}

function hideGraph(){
    container.style.display = 'flex';
    graphLine.style.display = 'none';
}
window.onload = hideGraph;
closeBtn.addEventListener('click', hideGraph)

