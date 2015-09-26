(function (exports) {
  'use strict';

  exports.qodWidget = function (el) {
    var template = _.template($("#qod-template").html());

    var endpoint = "http://api.theysaidso.com/qod.json?maxlength=200&category=funny";

    var qod = {
      quote: "Behind a great success, there was a great failure",
      author: "Michael Hermanto"
    }

    var render = function() {
      $.getJSON( endpoint, function() {
        })
        .done(function(data) {
          if(data.success)
          {
            qod.quote = data.contents.quotes[0].quote;
            qod.author = data.contents.quotes[0].author;
          }
        })
        .always(function() {
          el.html(template({
            quote: qod.quote,
            author: qod.author
          }));
        });
    };

    render();

    var qodId = window.setInterval(render, 86400000);

  }
}(window.smartMirror || (window.smartMirror = {})));
