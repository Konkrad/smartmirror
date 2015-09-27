(function (exports) {

  exports.utils = {
    totalWeight: function (data) {
      var total =  data.topLeft + data.topRight + data.bottomLeft + data.bottomRight;
      return Math.round(total * 10) / 10;
    },
    isOnOneFoot: function(data) {
      var left = data.topLeft + data.bottomLeft;
      var right = data.topRight + data.bottomRight;
      var total = left + right;

      return Math.abs(left - right) > 0.75 * total;
    }
  };

})(window.smartMirror || (window.smartMirror = {}));
