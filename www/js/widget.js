(function (exports) {
  'use strict';

  var app = document.getElementById("app");
  var widgets = document.getElementById("widgets");
  var destructors = [];
  var totalWidgets;
  var pos;
  var interval;
  var waitingTime = 2 * 1000;

  exports.widget = {
    show: function () {
      totalWidgets = 0;
      pos = 0;
      app.classList.add("show-widget");
    },

    add: function (widget) {
      var args = Array.prototype.slice.call(arguments, 1);
      var $widget = $('<div class="widget"></div>')

      $(widgets).append($widget);

      var destructor = widget.apply($widget[0], [$widget].concat(args));

      totalWidgets++;

      if (_.isFunction(destructor)) {
	destructors.push(destructor);
      }

      if (totalWidgets == 2) {
	interval = setInterval(function () {

	  pos = (pos + 1) % totalWidgets;

	  $(widgets).css("transform", "translate(0, " + (-(window.innerHeight+5) * pos) + "px)")

	}, waitingTime);
      }
    },

    hide: function () {
      totalWidgets = 0;
      clearInterval(interval);



      destructors.forEach(function (destructor) {
	destructor();
      });
      destructors = [];
      app.classList.remove("show-widget");
      $(widgets).empty();
    }
  };

}(window.smartMirror || (window.smartMirror = {})));
