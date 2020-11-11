var userFormEl = document.querySelector('#user-form');
var languageButtonsEl = document.querySelector('#history-buttons');
var nameInputEl = document.querySelector('#cityname');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
var clearButtonEl = document.querySelector('#clearbutton')
var key= "c460dd5c15d9df993585c0bf2401e2ca";//create account webpage
var UVIndex;
var historyCount=0;
var getCityStatus = function (city) {
  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+key;
//get API 
  var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityname = nameInputEl.value.trim();//name input.value 保留文字

  if (cityname) {
    getCityStatus(cityname);//function

    repoContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a cityname');
  }
};
//cilck function
var buttonClickHandler = function (event) {
  var city = event.target.getAttribute('cityName');
   
  if (city) {
    getHistoryCity(city);//get city name
//show
    repoContainerEl.textContent = '';
  }
};
  fetch(apiUrl)//拿到API，then开始response function，回应「」
  //OK is boolean 值
    .then(function (response) {
      if (response.ok) {//true，回应出里面的JSON（）
        response.json().then(function (data) {//jSON的数据变为DATA 在function里
          displayStatus(data, city);//API里拿到的最终数据，diaplayStatus is a
          
          var temp = document.getElementById(data.city.name);
       //save history as button
          if(temp == null){
            var historyButton= document.createElement('button');
            historyButton.setAttribute("cityName",data.city.name);
            historyButton.setAttribute("id",data.city.name);
            historyButton.setAttribute("class","btn");
            historyButton.textContent=data.city.name;
            save(data.city.name);
            languageButtonsEl.appendChild(historyButton);
          }
          
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};
function getUnIndex_1(data){
  UVIndex=data;
  return data;
}
var displayStatus = function (repos, searchTerm) {
  //40 5 day 3h change data. 3*7=21h 5weilai 
  //i +1 Hour+3, 6 times data get 
for (let i = 0; i< repos.list.length; i=i+7) {
var cityName=repos.city.name;//data.city.name: london;
//1970 1.1 - seconds 
    var date =new Date(repos.list[i].dt*1000);
    var localtime = moment(date).local().format('YYYY/MM/DD');
    //UTC - EST
    var Tempreture = ((repos.list[i].main.temp-273.15)*9/5+32).toFixed(1)+"°F";//k to f
    var Humidity = repos.list[i].main.humidity+"%";
    var WindSpeed = (repos.list[i].wind.speed+0).toFixed(1)+" MPH";
    //coordiate: location;
    var lat = repos.city.coord.lat;
    var lon = repos.city.coord.lon;
    var cityStatus = document.createElement('div');
    cityStatus.setAttribute("id","cityStatus"+i);
    var getUVIndex =function (lat,lon){//UV controled by coordinate
      var apiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+key;
      fetch( apiUrl )
        .then(function (response){
          if (response.ok) {
            response.json().then(function (data){
              var UVIndexEl = document.createElement('span');
              UVIndexEl.textContent="UV Index: "+data.value;//UV data
              document.getElementById("windspeed0").innerHTML=UVIndexEl.textContent;
 
 
           })
          }else {
            alert('Error: ' + response.statusText);
          }
        })
        .catch(function (error) {
          alert('Unable to connect to OpenWeather');
        });
    };
    if(i==0){
      getUVIndex(lat,lon);
    }
    //icon
    var iconcode = repos.list[i].weather[0].icon;
    var iconImage = document.createElement("img");
    var titleEl = document.createElement('span');
    var TempretureEl = document.createElement('span');
    var HumidityEl = document.createElement('span');
    var WindSpeedEl = document.createElement('span');
    iconImage.setAttribute("src","http://openweathermap.org/img/w/" + iconcode + ".png")
    WindSpeedEl.setAttribute("id","windspeed"+i);
    titleEl.textContent=cityName+" ("+localtime+")";
    TempretureEl.textContent="Temperature: "+Tempreture;
    HumidityEl.textContent="Humidity: "+Humidity;
    WindSpeedEl.textContent="Wind Speed:"+WindSpeed;
    //console.log(iconImage);
    cityStatus.appendChild(titleEl);
    cityStatus.appendChild(iconImage);
    cityStatus.appendChild( document.createElement("br"));
    cityStatus.appendChild(TempretureEl);
    cityStatus.appendChild( document.createElement("br"));
    cityStatus.appendChild(HumidityEl);
    cityStatus.appendChild( document.createElement("br"));
    cityStatus.appendChild(WindSpeedEl);
    cityStatus.appendChild( document.createElement("br"));
 

  

     repoContainerEl.appendChild(cityStatus);

  }
  
};
