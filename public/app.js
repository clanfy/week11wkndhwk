var init = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);
};

window.onload = init;

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var requestComplete = function(){
  if (this.status !==200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  console.log("request complete");
  console.log("countries", countries);
  populateChart(countries);
};

var populateChart = function(countries){
  var container = document.getElementById('pop-chart');
  var title = "Regions By Population";
  var series = getRegionInfo(countries);
  categories = ["population"];
  new PopColumnChart(container, title, series, categories);
};

getRegionInfo = function(countries){
  var populations = {};
  countries.forEach(function(country){
    if (populations[country.region]){
      populations[country.region] += country.population;
    } else {
      populations[country.region] = country.population;
    }
  });
  console.log(populations);
  var series = [];
  for (var region in populations){
    if (region) {
      console.log("Region: ", region, "Pop: ", populations[region]);
      series.push({name: region, data: [populations[region]]});
    }
  }
  return series;
};



