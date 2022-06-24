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


citySearchBtn.addEventListener('click', function (){
    const cityName = document.querySelector('.city_name').value;
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
    
    fetch(API)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let iconId = data['weather'][0]['icon'];
        icon.src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
        cityInput.textContent = `${data['name']}, ${data['sys']['country']}`;
        console.log(data['sys']['country']);
        flag.src= `../logos/64x64/city_flags/${data['sys']['country']}.png`;
        const temp = `${data['main']['temp']}`;
        cityTemp.textContent = `${temp.slice(0,2)} °C`;
        descrInput.textContent = `Description: ${data['weather'][0]['description']}`;
        feelLikeInput.textContent = `Feels like : ${data['main']['feels_like']} °C`;
        visibilityInput.textContent = `Visibility : ${data['visibility']/1000} km`;


        console.log(data);
        console.log(`Wind directs to ${(data['wind']['speed'])} m/s ${findWindDirection(data['wind']['deg'])}`);
    })
    .catch(response =>{
        if (cityName == ""){
            alert("Please include city name!");
        }
        // fix with alert instead of console output
        if(response.status == 404){
            alert('Not found!');
        }
    })
})



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
    
}
