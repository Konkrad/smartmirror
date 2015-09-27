(function (exports) {
  'use strict';

  exports.qodWidget = function (el) {
    var template = _.template($("#qod-template").html());

    var endpoint = "http://smartmirror.sfetea.ro/others/quote";

    var qod = {
      quote: "Behind a great success, there was a great failure",
      author: "Michael Hermanto"
    }

    var render = function() {
      $.getJSON( endpoint, function() {
      })
        .done(function(data) {
          qod.quote = data.quote;
          qod.author = data.author;
        })
        .always(function() {
          el.html(template({
            quote: qod.quote,
            author: qod.author
          }));
        });
    };

    render();
  }
}(window.smartMirror || (window.smartMirror = {})));
