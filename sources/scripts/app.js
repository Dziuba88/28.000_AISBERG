$(document).ready(function () {
  $('[data-scrollbar], .selectbox .list').mCustomScrollbar({
    theme: "minimal-dark",
    scrollInertia: 250,
  });
  $(window).on('resize', function() {
    $('[data-scrollbar], .selectbox .list').mCustomScrollbar('update');
  })
  setTimeout(function () {
    $('.mCustomScrollBox').prop('tabindex', '-1');
  }, 1000);

  if (localStorage.getItem('sidebar')) {
    if (localStorage.getItem('sidebar') == 'visible') {
      $('.b__layout').removeClass('hide__sidebar');
    }
    if (localStorage.getItem('sidebar') == 'hidden') {
      $('.b__layout').addClass('hide__sidebar');
    }
  } else {
    localStorage.setItem('sidebar', 'visible');
    $('.b__layout').removeClass('hide__sidebar');
  }
  $('[data-toggle="sidebar"]').on('click', function () {
    if (localStorage.getItem('sidebar') == 'visible') {
      localStorage.setItem('sidebar', 'hidden');
      $('.b__layout').addClass('hide__sidebar');
      return
    }
    if (localStorage.getItem('sidebar') == 'hidden') {
      localStorage.setItem('sidebar', 'visible');
      $('.b__layout').removeClass('hide__sidebar');
    }
  });

  $('[data-toggle="offcanvas"]').on('click', function (e) {
    e.stopPropagation()
    $('.b__layout--aside').toggleClass('show');
    $('.b__layout--content').toggleClass('blur');
  });
  $(document).on('click', function (e) {
    if ($(e.target).is('.b__layout--aside') || $('.b__layout--aside').has(e.target).length > 0 ) {
      return
    }
    $('.b__layout--aside').removeClass('show');
    $('.b__layout--content').removeClass('blur');
  })

  if ( $('input').length ) {
    $(":input").inputmask({ "placeholder": "#" });

    $('.fileinput input').on('change', function (e) {
      var file = e.target.files[0].name
      var placeholder = $(e.target).parent('.fileinput').find('span')
      placeholder.text(file)
    })
  }

  $('.panel__close').on('click', function () {
    $(this).parent('.collapsible').addClass('closed')
  });


});

$(window).on('load', function () {
  $('#preloader').fadeOut(1000)
});



// CHARTS DEMO SCRIPTS
  // CHART AI Signal
    if ($('#chart_ai').length) {
      var chartAIoption = {
        title: { show: false },
        legend: { show: false },
        tooltip: { show: false },
        textStyle: {fontFamily: '"Noto Sans", sans-serif',fontSize: 11,color: '#727e98'},
        grid: {top: 0,left: 0,right: 0,bottom: '20px',containLabel: true},
        xAxis: {
          type: 'category',
          scale: true,
          axisLine: { lineStyle: { color: '#727e98' } },
          axisLabel: { showMinLabel: null, showMaxLabel: null },
          data: ['09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50']
        },
        yAxis: {
          type: 'value',
          scale: true,
          axisLine: { lineStyle: { color: '#727e98' }, onZero: false },
          position: 'right',
          splitNumber: 4,
          boundaryGap: ['10%', '10%'],
          axisLabel: { showMinLabel: false, showMaxLabel: false }
        },
        series: [
          {
            name: 'REAL',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 1,
            hoverAnimation: false,
            label: {
              show: false,
              position: 'bottom',
              color: '#00d1d1',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Montserrat', sans-serif"
            },
            lineStyle: { color: '#00d1d1' },
            itemStyle: { color: '#00d1d1', borderWidth: 0 },
            data: [120.00, 132.25, 101.30, 120.00, 132.25, 101.30, 134.75, 120.15, 132.99, 101.45, 134.36, { value: 90.78, label: { show: true } }]
          },
          {
            name: 'PREDICTED',
            type: 'line',
            symbol: 'circle',
            symbolSize: 14,
            hoverAnimation: false,
            label: {
              show: false,
              position: 'top',
              color: '#ff365c',
              distance: 10,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Montserrat', sans-serif"
            },
            lineStyle: { width: 0, color: '#ff365c' },
            itemStyle: { color: '#ff365c', borderWidth: 0 },
            data: [124.00, { value: 130.25, itemStyle: { color: '#727e98' } }, 107.30, 124.00, { value: 130.25, itemStyle: { color: '#727e98' } }, 107.30, 134.75, { value: 124.15, itemStyle: { color: '#727e98' } }, 130.99, 100.45, { value: 135.36, itemStyle: { color: '#727e98' } }, { value: 108.78, label: { show: true } }]
          }
        ]
      };
      $(document).ready(function () {
        setTimeout(function () {
          var chartAI = echarts.init(document.getElementById("chart_ai"));
          chartAI.setOption(chartAIoption, true);
          $('[data-toggle="sidebar"]').click(function () {
            if (chartAI != null && chartAI != undefined) {
              setTimeout(function () { chartAI.resize() }, 150);
            };
          });
          $(window).on('resize', function () {
            if (chartAI != null && chartAI != undefined) {
              setTimeout(function () { chartAI.resize() }, 100);
            };
          });
        }, 100);
      });
    };
  // CHART Prediction Accuracy
    if ($('#chart_pred').length) {
      var accuracy = 93;
      var chartAccuracyData = [
        ["13:00", 95], ["13:05", 96], ["13:10", 94], ["13:15", 90], ["13:20", 95], ["13:25", 98], ["13:25", 92], ["13:30", 97], ["13:35", 92], ["13:40", 98]
      ];
      var chartAccuracyOption = {
        title: { show: false },
        tooltip: { trigger: 'axis', axisPointer: { type: 'none' }, formatter: '{b}<br />{a}: {c}%' },
        textStyle: {fontFamily: '"Noto Sans", sans-serif',fontSize: 11,color: '#727e98'},
        grid: {top: 0,left: 0,right: 0,bottom: 0,containLabel: true},
        xAxis: {
          data: chartAccuracyData.map(function (item) { return item[0] })
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: '#727e98' } },
          position: 'right',
          boundaryGap: ['10%', '10%'],
          axisLabel: { formatter: '{value}%', showMinLabel: false, showMaxLabel: false }
        },
        visualMap: {
          show: false,
          pieces: [{ gt: 0, lte: accuracy, color: '#ff365c' }, { gt: accuracy, lte: 100, color: '#2ebf2e' }],
          outOfRange: { color: '#727e98' }
        },
        series: {
          name: 'Prediction',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 1,
          data: chartAccuracyData.map(function (item) { return item[1] }),
        }
      };
      
      $(document).ready(function () {
        setTimeout(function () {
          var chartAccuracy = echarts.init(document.getElementById('chart_pred'));
          chartAccuracy.setOption(chartAccuracyOption, true) 
          $('[data-toggle="sidebar"]').click(function () {
            if (chartAccuracy != null && chartAccuracy != undefined) {
              setTimeout(function () { chartAccuracy.resize() }, 150);
            };
          });
          $(window).on('resize', function () {
            if (chartAccuracy != null && chartAccuracy != undefined) {
              setTimeout(function () { chartAccuracy.resize() }, 100);
            };
          });
        }, 100);
      });
    }
  // SIMPLE CHARTS
    function createChart(selectorID, color) {
      function createDate() {
        now = new Date(+now + oneDay);
        return [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
      }
      var dates = [];
      var values = [];
      var now = +new Date(2018, 1, 1);
      var oneDay = 24 * 3600 * 1000;
      for (var i = 0; i < 35; i++) {
        dates.push(createDate());
        values.push(Math.floor(Math.random() * 100 + 1));
      }
      var option = {
        title: { show: false },
        legend: { padding: 0, itemGap: 0, show: false },
        tooltip: { show: false },
        toolbox: { show: false },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 'auto',
          height: 'auto',
          containLabel: false,
          borderWidth: 0
        },
        xAxis: {
          show: false,
          data: dates
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          data: values,
          type: 'line',
          smooth: true,
          lineStyle: { color: color },
          showSymbol: false,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(0,0,0, 0.1)' },
                { offset: 1, color: 'rgba(0,0,0, 0)' }
              ]
            }
          }
        }]
      };
      var chart = echarts.init(document.getElementById(selectorID));
      chart.setOption(option, true);

      $('[data-toggle="sidebar"]').click(function () {
        if (chart != null && chart != undefined) {
          setTimeout(function () { chart.resize(); }, 150);
        }
      });

      $(window).on('resize', function () {
        if (chart != null && chart != undefined) {
          setTimeout(function () { chart.resize(); }, 100);
        }
      });
    };
    function createSeries(selectorID) {
      function createDate() {
        now = new Date(+now + oneDay);
        return [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
      }
      var dates = [];
      var bid = [];
      var ask = [];
      var now = +new Date(2018, 1, 1);
      var oneDay = 24 * 3600 * 1000;
      for (var i = 0; i < 70; i++) {
        dates.push(createDate());
        bid.push(Math.floor(Math.random() * 100 + 1));
        ask.push(Math.floor(Math.random() * 100 + 1));
      }
      var option = {
        title: { show: false },
        legend: { padding: 0, itemGap: 0, show: false },
        tooltip: { show: false },
        toolbox: { show: false },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 'auto',
          height: 'auto',
          containLabel: false,
          borderWidth: 0
        },
        xAxis: {
          show: false,
          data: dates
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [
          {
            data: bid,
            type: 'line',
            lineStyle: { width: 1, color: '#00d1d1' },
            showSymbol: false,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(0,0,0, 0.1)' },
                  { offset: 1, color: 'rgba(0,0,0, 0)' }
                ]
              }
            }
          },
          {
            data: ask,
            type: 'line',
            lineStyle: { width: 1, color: '#ff365c' },
            showSymbol: false,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(0,0,0, 0.1)' },
                  { offset: 1, color: 'rgba(0,0,0, 0)' }
                ]
              }
            }
          }
        ]
      };
      var chart = echarts.init(document.getElementById(selectorID));
      chart.setOption(option, true);

      $('[data-toggle="sidebar"]').click(function () {
        if (chart != null && chart != undefined) {
          setTimeout(function () { chart.resize(); }, 150);
        }
      });

      $(window).on('resize', function () {
        if (chart != null && chart != undefined) {
          setTimeout(function () { chart.resize(); }, 100);
        }
      });
    };
    $(document).ready(function () {
      setTimeout(function () {
        if ($('#chart_0').length) createChart("chart_0", '#2ebf2e');
        if ($('#chart_1').length) createChart("chart_1", '#2ebf2e');
        if ($('#chart_2').length) createChart("chart_2", '#ffaf36');
        if ($('#chart_3').length) createChart("chart_3", '#2ebf2e');
        if ($('#chart_4').length) createChart("chart_4", '#2ebf2e');
        if ($('#chart_5').length) createChart("chart_5", '#2ebf2e');
        if ($('#chart_6').length) createChart("chart_6", '#2ebf2e');
        if ($('#chart_7').length) createChart("chart_7", '#2ebf2e');
        if ($('#chart_8').length) createChart("chart_8", '#2ebf2e');
        if ($('#chart_9').length) createChart("chart_9", '#2ebf2e');
        if ($('#chart_10').length) createChart("chart_10", '#2ebf2e');
        if ($('#chart_11').length) createChart("chart_11", '#2ebf2e');
        if ($('#chart_12').length) createChart("chart_12", '#2ebf2e');
        if ($('#chart_13').length) createChart("chart_13", '#2ebf2e');
        if ($('#chart_14').length) createChart("chart_14", '#2ebf2e');
        if ($('#chart_15').length) createChart("chart_15", '#2ebf2e');
        if ($('#chart_din_0').length) createSeries("chart_din_0");
        if ($('#chart_din_1').length) createSeries("chart_din_1");
        if ($('#chart_din_2').length) createSeries("chart_din_2");
        if ($('#chart_din_3').length) createSeries("chart_din_3");
      }, 100);
    });

