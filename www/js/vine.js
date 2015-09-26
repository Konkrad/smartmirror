(function (exports) {
  'use strict';

  exports.vineWidget = function (el) {
    var template = _.template($("#video-template").html());

    var vine = {
      copyright: "vine/Arthur Sellati",
      html: "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fvine.co%2Fv%2FhB2FwpJYtMa%2Fembed%2Fsimple%3Fautoplay%3Dtrue&url=https%3A%2F%2Fvine.co%2Fv%2FhB2FwpJYtMa&image=https%3A%2F%2Fv.cdn.vine.co%2Fv%2Fthumbs%2F17CA24CE-0455-421B-9E6F-5EE25F47B490-77284-0000144C972CE63F_11fc0a23927.1.2.mp4.jpg%3FversionId%3DKpIOkWx8zjc_.aOVsaMAycc1b.j_w4_J&key=internal&autoplay=1&type=text%2Fhtml&schema=vine\" width=\"600\" height=\"600\" scrolling=\"no\" frameborder=\"0\" allowfullscreen></iframe>"
    }

    var randomVine = function() {
      var random = Math.floor(Math.random(vines.data.records.length)*(vines.data.records.length-1));

      var link = vines.data.records[random].permalinkUrl;

      var encode = encodeURIComponent(link);
      var endpoint = "http://api.embed.ly/1/oembed?url="+encode+"&maxheight=800&maxwidth=800&autoplay=true&key=4b13633f9d2b404396f50910f6ebc673&nostyle=true";

      $.getJSON( endpoint, function() {
      })
      .done(function(data) {
          vine.html = data.html;
          vine.copyright = "vine/"+data.author_name;
      })
      .always(function() {
        render();
      })
    };

    var render = function() {
      el.html(template({
        html: vine.html,
        copyright: vine.copyright
      }));
    }
    var vines = {};

      $.getJSON( "js/vine.json", function() {
      })
      .done(function(data) {
        if(data.success)
        {
          vines = data;
          randomVine();
          var vineId = window.setInterval(render, 1000*60);
        }
      })
      .fail(function() {
        render();
      })
    };
}(window.smartMirror || (window.smartMirror = {})));
