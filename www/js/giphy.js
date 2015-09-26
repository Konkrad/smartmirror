(function (exports) {
  'use strict';

  exports.giphyWidget = function (el) {
    var template = _.template($("#image-template").html());

    var endpoint = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=funny";

    var giphy = {
      url: "img/giphy.gif"
    }

    var render = function() {
      $.getJSON( endpoint, function() {
        })
        .done(function(data) {
          if(data.meta.status === 200)
          {
            giphy.url = data.data.image_original_url;
          }
        })
        .always(function() {
          el.html(template({
            url: giphy.url,
            copyright: Giphy
          }));
        });
    };

    render();

    var giphyId = window.setInterval(render, 1000*60*60);

  }
}(window.smartMirror || (window.smartMirror = {})));
