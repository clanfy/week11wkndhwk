var init = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);

  var clearButton = document.querySelector('#clear-button');
  clearButton.onclick = clearButtonClick;

  var popButton = document.querySelector('#pop-button');
  popButton.onclick = popButtonClick;

  var areaButton = document.querySelector('#area-button');
  areaButton.onclick = areaButtonClick;

};

window.onload = init;

var clearButtonClick = function(){
  var areaContainer = document.getElementById('area-chart');
  var popContainer = document.getElementById('pop-chart');
  areaContainer.style.display = 'initial';
  popContainer.style.display = 'initial';
};

var popButtonClick = function(){
  var areaContainer = document.getElementById('area-chart');
  areaContainer.style.display = 'none';

};

var areaButtonClick = function(){
  var popContainer = document.getElementById('pop-chart');
  popContainer.style.display = 'none';
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
  areaChart(countries);
};

var getCountries = function(responseText){
  var jsonString = responseText;
  var countries = JSON.parse(jsonString);
  return countries;
};

var populateChart = function(countries){
  var popContainer = document.getElementById('pop-chart');
  var title = "Population of Regions";
  var series = getRegionPopulation(countries);
  categories = ["Population"];
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

var areaChart = function(countries){
  var areaContainer = document.getElementById('area-chart');
  var title = "Area of Regions";
  var series = getRegionArea(countries);
  categories = ["Area"];
  new AreaColumnChart(areaContainer, title, series, categories);
};

getRegionArea = function(countries){
 var areas = {};
 countries.forEach(function(country){
  if (areas[country.region]){
    areas[country.region] += country.area;
  } else {
    areas[country.region] = country.area;
  }
});
 console.log("get region area", areas);
 var series = [];
 for (var region in areas){
  if (region){
    console.log("Region: ", region, "Area: ", areas[region]);
    series.push({name: region, data: [areas[region]]});
  }
}
return series;
};



