(function (exports) {
  'use strict';

  exports.weatherWidget = function (el) {
    var template = _.template($("#weather-template").html());

    var endpoint = "http://smartmirror.sfetea.ro/others/weather";

    var weather = {
      temperature: 30,
      summary: "always shiny",
      icon: "CLEAR_DAY"
    };

    var render = function() {
      $.getJSON( endpoint, function( data ) {
      })
      .done(function(data) {
        weather.temperature = data.temperature,
        weather.summary = data.summary,
        weather.icon = data.icon.toUpperCase();
        weather.icon = weather.icon.replace(/-/g, "_");
      })
      .always(function() {
        el.html(template({
          temperature: weather.temperature,
          summary: weather.summary
        }));
        var skycons = new Skycons({"color": "white","resizeClear": true});
        skycons.add("weather_icon", Skycons[weather.icon]);
        skycons.play();
      });
    }

    render();

    var weatherID = window.setInterval(render, 1000 * 60 * 10);

  }
}(window.smartMirror || (window.smartMirror = {})));
