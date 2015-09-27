(function (exports) {
  'use strict';

  exports.calendarWidget = function (el,id) {
    var template = _.template($("#calendar-template").html());

    var endpoint = "http://smartmirror.sfetea.ro/others/event/"+id;

    var calendar = {
      name: "IHK Oktoberhackfest Hackathon",
      location: "IHK-Akademie - Orleansstraße 10 - 81669 München - Germany",
      start: "September 25, 4:00 pm",
      end: "September 27, 1:00 pm"
    };

    var render = function() {
      $.getJSON( endpoint, function( data ) {
      })
    	.done(function(data) {
        calendar.name = data.name;
        calendar.location = data.location;
        calendar.start = data.start;
        calendar.end = data.end;
    	})
    	.always(function() {
          el.html(template({
            name: calendar.name,
            location: calendar.location,
            start: calendar.start,
            end: calendar.end
        }));
    	});
    };

    render();
  }
}(window.smartMirror || (window.smartMirror = {})));
