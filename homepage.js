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
