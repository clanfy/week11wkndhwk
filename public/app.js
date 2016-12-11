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
  var popContainer = document.getElementById('pop-chart');
  var areaContainer = document.getElementById('area-chart');
  popContainer.style.display = 'initial';
  areaContainer.style.display = 'none';

};

var areaButtonClick = function(){
  var areaContainer = document.getElementById('area-chart');
  var popContainer = document.getElementById('pop-chart');
  areaContainer.style.display = 'initial';
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
  // console.log("request complete");
  // console.log("countries at requestComplete", countries);
  populateChart(countries);
  areaChart(countries);
  currencyChart(countries);
};

var getCountries = function(responseText){
  var jsonString = responseText;
  var countries = JSON.parse(jsonString);
  // console.log("Get Countries", countries);
  return countries;
};

var populateChart = function(countries){
  var popContainer = document.getElementById('pop-chart');
  var title = "Population of Regions";
  var series = getRegionPopulation(countries);
  var categories = ["Population"];
  new ColumnChart(popContainer, title, series, categories);
};

getRegionPopulation = function(countries){
  // console.log("get region countries:", countries);
  var populations = {};
  // console.log("populations", populations);
  countries.forEach(function(country){
    if (populations[country.region]){
      populations[country.region] += country.population;
    } else {
      populations[country.region] = country.population;
    }
  });
  // console.log("get region population" ,populations);
  var series = [];
  for (var region in populations){
    if (region) {
      // console.log("Region: ", region, "Pop: ", populations[region]);
      series.push({name: region, data: [populations[region]]});
    }
  }
  return series;
};

var areaChart = function(countries){
  var areaContainer = document.getElementById('area-chart');
  var title = "Area of Regions";
  var series = getRegionArea(countries);
  // console.log("series", series);
  var categories = ["Area"];
  new ColumnChart(areaContainer, title, series, categories);
};

getRegionArea = function(countries){
 var areas = {};
 // console.log(areas);
 countries.forEach(function(country){
  if (areas[country.region]){
    areas[country.region] += country.area;
  } else {
    areas[country.region] = country.area;
  }
});
 // console.log("get region area", areas);
 var series = [];
 for (var region in areas){
  if (region){
    // console.log("Region: ", region, "Area: ", areas[region]);
    series.push({name: region, data: [areas[region]]});
  }
}
return series;
};

var currencyChart = function(countries){
  var currencyContainer = document.getElementById('curr-chart');
  var title = "Currencies of the World";
  var series = getCountriesCurrencies(countries);
  var categories =  ["Currencies"];
  new SmallColumnChart(currencyContainer, title, series, categories);
};

var getCountriesCurrencies = function(countries){
  console.log("countries at getCountriescurrencies", countries);
  var currencies = {};
 countries.forEach(function(country){
  if (currencies[country.currencies[0]]){
  console.log("stuff");
    currencies[country.currencies[0]] += 1;
  } else {
    currencies[country.currencies[0]] = 1;
  }
 });
 var series = [];
 for (var country in currencies){
  if (country){
    console.log("Country: ", country, "Currency:", currencies[country]);
    series.push({name: country, data: currencies[country]});
  }
 }
 console.log("series", series);
 return series;
};

// //##################################
// //GET AREA OF EACH COUNTRY
// getRegionArea = function(countries){
//  var areas = {};
//  console.log(areas);
//  countries.forEach(function(country){
//   if (areas[country.name]){
//     areas[country.name] = country.area;
//   } else {
//     areas[country.name] = country.area;
//   }
// });
//  // console.log("get region area", areas);
//  var series = [];
//  for (var country in areas){
//   if (country){
//     // console.log("Region: ", region, "Area: ", areas[region]);
//     series.push({name: country, data: [areas[country]]});
//   }
// }
// return series;
// };
// //###################################


