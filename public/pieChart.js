var PieChart = function(){

  var chart = new Highcharts.Chart({

    chart: {
      type: 'pie',
      renderTo: container
    },

    title: {
      text: text
    },

    series: [{
      name: seriesName,
      data: data
    }]

  });

};
