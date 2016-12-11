var PieChart = function(container, title, seriesName, data){

  var chart = new Highcharts.Chart({

    chart: {
      type: 'pie',
      renderTo: container
    },

    title: {
      text: title
    },

    series: [{
      name: seriesName,
      data: data
    }]

  });

};
