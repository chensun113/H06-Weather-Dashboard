var userFormEl = document.querySelector('#user-form');
var languageButtonsEl = document.querySelector('#history-buttons');
var nameInputEl = document.querySelector('#cityname');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
var clearButtonEl = document.querySelector('#clearbutton')
var key= "c460dd5c15d9df993585c0bf2401e2ca";
var UVIndex;
var historyCount=0;

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityname = nameInputEl.value.trim();

  if (cityname) {
    getCityStatus(cityname);

    repoContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a cityname');
  }
};

var buttonClickHandler = function (event) {
  var city = event.target.getAttribute('cityName');

  if (city) {
    getHistoryCity(city);

    repoContainerEl.textContent = '';
  }
};

var getCityStatus = function (city) {
  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+key;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayStatus(data, city);
          
          var temp = document.getElementById(data.city.name);
       
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



// todo
var getHistoryCity = function (city) {
  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+key;
  //console.log(city);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayStatus(data, city);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

function clear(){
  localStorage.clear();
  console.log("triggered")
  location.reload();
}

function save(i){
  console.log("save function begin "+localStorage.getItem("History_Count_Index"));
  if (localStorage.getItem("History_Count_Index")==null) {
    localStorage.setItem("History_Count_Index",historyCount);
  }else{
    historyCount=localStorage.getItem("History_Count_Index");

  }
  //save triigered we save a flag show we have memory data
  var triggerflag = "true";
  localStorage.setItem("flag",triggerflag);
 historyCount++;
  var dataToSave=i
  localStorage.setItem(localStorage.getItem("History_Count_Index"),dataToSave);
  localStorage.setItem("History_Count_Index",historyCount);
  //localStorage.clear();
}
show()
function show(){
  if (localStorage.getItem("flag")=="true") {
      //console.log("data in storage");  
      var length = localStorage.getItem("History_Count_Index");
      console.log(length);
      for (let i = 0; i < length; i++) {
       var dataToShow = localStorage.getItem(i);
       console.log(dataToShow);
       var historyButton= document.createElement('button');
       historyButton.setAttribute("cityName",dataToShow);
       historyButton.setAttribute("id",dataToShow);
       historyButton.setAttribute("class","btn");
       historyButton.textContent=dataToShow;
       languageButtonsEl.appendChild(historyButton);
        
      }

     }
// localStorage.clear();
}







var displayStatus = function (repos, searchTerm) {
  // if (repos.city.name != searchTerm) {
  //   repoContainerEl.textContent = 'No City found.';
  //   return;
  // }

 // console.log(repos.list[0]);
  for (let i = 0; i< repos.list.length; i=i+7) {

  
    var cityName=repos.city.name;
    var date =new Date(repos.list[i].dt*1000);
    var localtime = moment(date).local().format('YYYY/MM/DD');
    var Tempreture = ((repos.list[i].main.temp-273.15)*9/5+32).toFixed(1)+"°F";
    var Humidity = repos.list[i].main.humidity+"%";
    var WindSpeed = (repos.list[i].wind.speed+0).toFixed(1)+" MPH";
    var lat = repos.city.coord.lat;
    var lon = repos.city.coord.lon;
    var cityStatus = document.createElement('div');
    cityStatus.setAttribute("id","cityStatus"+i);
    var getUVIndex =function (lat,lon){
      var apiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+key;
      fetch( apiUrl )
        .then(function (response){
          if (response.ok) {
            response.json().then(function (data){
              var UVIndexEl = document.createElement('span');
              UVIndexEl.textContent="UV Index: "+data.value;
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
    //UVIndex status at above

   


  //  repoSearchTerm.textContent = searchTerm;


  //   var repoName = repos[i].owner.login + '/' + repos[i].name;

  //   var repoEl = document.createElement('div');
  //   repoEl.classList = 'list-item flex-row justify-space-between align-center';

  //   var titleEl = document.createElement('span');
  //   titleEl.textContent = repoName;

  //   repoEl.appendChild(titleEl);

  //   var statusEl = document.createElement('span');
  //   statusEl.classList = 'flex-row align-center';

  //   if (repos[i].open_issues_count > 0) {
  //     statusEl.innerHTML =
  //       "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
  //   } else {
  //     statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
  //   }

  //   repoEl.appendChild(statusEl);

     repoContainerEl.appendChild(cityStatus);

  }
  
};

userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);
clearButtonEl.addEventListener('click',clear);