var init = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);

  var popButton = document.querySelector('#pop-button');
  popButton.onclick = popButtonClick;

};
  

window.onload = init;

var popButtonClick = function(){
  var container = document.getElementById('pop-chart');
  console.log("pop button clicked");
  console.log(container);
  container.style.visibility = 'hidden';

};

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var requestComplete = function(){
  if (this.status !==200) return;
  var countries = getCountries(this.responseText);
  console.log("request complete");
  console.log("countries at requestComplete", countries);
  populateChart(countries);
  currencyChart(countries);
};

var getCountries = function(responseText){
  var jsonString = responseText;
  var countries = JSON.parse(jsonString);
  return countries;
};

var populateChart = function(countries){
  var popContainer = document.getElementById('pop-chart');
  var title = "Regions By Population";
  var series = getRegionPopulation(countries);
  categories = ["population"];
  new PopColumnChart(popContainer, title, series, categories);
};

getRegionPopulation = function(countries){
  var populations = {};
  countries.forEach(function(country){
    if (populations[country.region]){
      populations[country.region] += country.population;
    } else {
      populations[country.region] = country.population;
    }
  });
  console.log("get region population" ,populations);
  var series = [];
  for (var region in populations){
    if (region) {
      console.log("Region: ", region, "Pop: ", populations[region]);
      series.push({name: region, data: [populations[region]]});
    }
  }
  return series;
};

var currencyChart = function(countries){
  var currencyContainer = document.getElementById('currencies');
};



