(function () {
  'use strict';

  var widget = smartMirror.widget;
  var weightWidget = smartMirror.weightWidget;
  var utils = smartMirror.utils;
  var standing = false;

  smartMirror.weatherWidget($("#weather"));
  smartMirror.clockWidget($("#clock"));

  if (window.AndroidFullScreen) {
    AndroidFullScreen.leanMode(function () {}, function () {});
  }

  balanceBoard.connect();

  balanceBoard.on('disconnected', function () {
    console.log("disconnected");

    setTimeout(function () {
      balanceBoard.connect();
    }, 1000);
  });

  balanceBoard.on("data", function (data) {
    if (utils.totalWeight(data) < 3) {
      widget.hide();
      standing = false;

      console.log("hide");

    } else if (!standing) {
      widget.show();
      widget.add(weightWidget);
      standing = true;
    }

  });
}());
