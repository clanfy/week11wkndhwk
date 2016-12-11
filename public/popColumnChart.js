var PopColumnChart = function(container, title, series, categories){

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
    },
    yAxis: {
      labels: {
        formatter: function(){
          return this.value/1000000 + 'M';
        },
        style: {
          color: 'DodgerBlue'
        }
      }
    }
  });

};