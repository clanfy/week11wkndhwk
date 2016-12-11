var SmallColumnChart = function(container, title, series, categories){

  var chart = new Highcharts.Chart({

    chart: {
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