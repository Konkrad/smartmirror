(function (exports) {

  exports.utils = {
    totalWeight: function (data) {
      var total =  data.topLeft + data.topRight + data.bottomLeft + data.bottomRight;
      return Math.round(total * 10) / 10;
    }
  };

})(window.smartMirror || (window.smartMirror = {}));
