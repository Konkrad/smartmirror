(function (exports) {
  'use strict';

  exports.flickrWidget = function (el) {
    var template = _.template($("#image-template").html());

    var endpoint = "https://api.flickr.com/services/rest/?format=json&method=flickr.interestingness.getList&api_key=b0ceded717db10ddfd6454417ec5b1be&per_page=1&extras=owner_name&nojsoncallback=1";

    var flickr = {
      url: "img/flickr.jpg",
      copyright: "flickr/ragingwire"
    }

    var render = function() {
      $.getJSON( endpoint, function() {
        })
        .done(function(data) {
          if(data.stat === "ok")
          {
            var photo = data.photos.photo[0];
            flickr.url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_c.jpg";
            flickr.copyright = "flickr/"+photo.ownername;
          }
        })
        .always(function() {
          el.html(template({
            url: flickr.url,
            copyright: flickr.copyright
          }));
        });
    };

    render();
  }
}(window.smartMirror || (window.smartMirror = {})));
