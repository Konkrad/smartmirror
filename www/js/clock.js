(function (exports) {
  'use strict';

  exports.clockWidget = function (el) {
    var template = _.template($("#clock-template").html());

    var render = function() {
        el.html(template({
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString()
        }));
    };

    render();

    var clockId = window.setInterval(render, 1000);

  }
}(window.smartMirror || (window.smartMirror = {})));
