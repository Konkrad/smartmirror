(function (exports) {
  'use strict';

  exports.weatherWidget = function (el) {
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Munic%22)%20and%20u%3D'c'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
    var template = _.template($("#weather-template").html());

    var weather = {};

    $.getJSON( url, function( data ) {
      console.log("got data");

      weather.temperature = data.query.results.channel.item.condition.temp;
      weather.condition = data.query.results.channel.item.condition.text;
      weather.code = data.query.results.channel.item.condition.code;

      if(weather.code < 10)
      {
        weather.code = "0"+weather.code;
      }

      el.html(template({
        temperature: weather.temperature,
        condition: weather.condition,
        code: weather.code
      }));

      console.log(template({
        temperature: weather.temperature,
        condition: weather.condition,
        code: weather.code
      }));
    });

  }
}(window.smartMirror || (window.smartMirror = {})));
