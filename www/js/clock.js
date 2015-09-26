(function (exports) {
  'use strict';

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var dayNames = ["Sunday","Monday", "Tuesday", "Wednesday",
		  "Thursday", "Friday", "Saturday"];


  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  exports.clockWidget = function (el) {
    var template = _.template($("#clock-template").html());
    var date = new Date();
    var day = date.getDate();
    var weekDay = date.getDay();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();


    var render = function() {
      el.html(template({
        time: formatAMPM(date),
        date: dayNames[weekDay] + ", " + day +  ". " + monthNames[monthIndex]
      }));
    };

    render();

    var clockId = window.setInterval(render, 60 * 1000);

  }
}(window.smartMirror || (window.smartMirror = {})));
