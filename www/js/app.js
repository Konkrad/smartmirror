(function () {
  'use strict';

  var widget = smartMirror.widget;
  var weightWidget = smartMirror.weightWidget;
  var utils = smartMirror.utils;
  var standing = false;

  smartMirror.weatherWidget($("#weather"));
  smartMirror.clockWidget($("#clock"));
  smartMirror.qodWidget($("#qod"));
  smartMirror.giphyWidget($("#giphy"));
  smartMirror.flickrWidget($("#flickr"));
  smartMirror.vineWidget($("#vine"));

  if (window.AndroidFullScreen) {
    AndroidFullScreen.leanMode(function () {}, function () {});
  }

  balanceBoard.connect();

  balanceBoard.on('disconnected', function () {
    setTimeout(function () {
      balanceBoard.connect();
    }, 2000);
  });

  balanceBoard.on("data", function (data) {
    if (utils.totalWeight(data) < 3) {
      widget.hide();
      standing = false;

    } else if (standing == false) {
      widget.show(weightWidget);
      standing = true;
    }



  });
}());
