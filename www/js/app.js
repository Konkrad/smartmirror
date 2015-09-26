(function () {
  'use strict';

  var widget = smartMirror.widget;
  var weightWidget = smartMirror.weightWidget;
  var utils = smartMirror.utils;
  var standing = false;

  smartMirror.weatherWidget($("#weather"));
  smartMirror.clockWidget($("#clock"));

  document.getElementById("button").onclick = function () {
    balanceBoard.connect();
  }


  balanceBoard.on('discovered', function () {
    console.log('balance board has been discovered');
  });

  balanceBoard.on('connecting', function () {
    console.log('started connecting with balance board');
  });

  balanceBoard.on('connected', function () {
    console.log('connected to balance board');
  });

  balanceBoard.on('disconnected', function () {
    // known issue: this event is only triggered if the Balance Board is disconnected properly
    // not if the power is turned of

    console.log('balance board disconnected');
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
