(function (exports) {
  'use strict';

  var app = document.getElementById("app");
  var target = document.getElementById("widget");
  var destructor = null;

  exports.widget = {
    show: function (widget) {
      var args = Array.prototype.slice.call(arguments, 1);

      if (_.isFunction(destructor)) {
	destructor();
      }

      destructor  = widget.apply(target, args);
      app.classList.add("show-widget");
    },

    hide: function () {
      app.classList.remove("show-widget");
    }
  };

}(window.smartMirror || (window.smartMirror = {})));
