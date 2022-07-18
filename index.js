// Your code here
let sectionWeather = document.querySelector('#weather');
let inputLocation = document.querySelector('#weather-search');
let buttonSubmit = document.querySelector('button[type="submit"]');

inputLocation.setAttribute( "autocomplete", "off" ); 
buttonSubmit.addEventListener('click', onSearch);


function onSearch(e) {
  e.preventDefault();
  inputLocation.setAttribute( "autocomplete", "off" ); 
  const location = inputLocation.value; 
  searchWeather(location);
  inputLocation.value = '';    
}


//Async-Await
searchWeather = async (location) => { 
    const apiKey = 'a76b32bf5b491e65fd99110fed59d0ba';
    const url =  `https://api.openweathermap.org/data/2.5/weather?zip=${location},&appid=${apiKey}&units=imperial`;
  
    await (await fetch(url)).json()

    fetch(url)
        .then (response => response.json())
        .then (data => {
            if(data !== null){
              showWeather(data);
            }
        })      
}


//Arrow Function
showWeather = (data) => {  
    if(data.cod !== 200){
        sectionWeather.innerHTML = '<p>Location Not Found</p>';  
    }
    else{
        if(data.cod === 200){
            //Destructuring
            const { coord: {lat, lon}, main: { feels_like, temp }, name, sys: {country}, weather: {[0]: {description, icon}}} = data;
            let dateTime = new Date();
            let currentTime = dateTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute:'2-digit'
              });
            
            //Template Literal  
            sectionWeather.innerHTML = `
                <h2>${ name },  ${ country }</h2>
                <a href="https://www.google.com/maps/search/?api=1&query=${ lat },${ lon }" target="__BLANK">Click to view map</a>
                <img src="https://openweathermap.org/img/wn/${ icon }@2x.png">
                <p style="text-transform: capitalize;">${ description }</p><br>
                <p>Current: ${ temp } ° F</p>
                <p>Feels like: ${feels_like} F</p><br>
                <p>Last updated: ${ currentTime }</p>
            `;
        }
    }    
}
