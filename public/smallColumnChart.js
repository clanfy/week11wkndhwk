var SmallColumnChart = function(container, title, series, categories){

  var chart = new Highcharts.Chart({

    chart: {
      height: 750,
      type: 'column',
      renderTo: container
    },
    title: {
      text: title
    },
    series: series,
    xAxis: {
      categories: categories
    }
  });

};