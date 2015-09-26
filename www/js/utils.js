(function (exports) {

  exports.utils = {
    totalWeight: function (data) {
      return data.topLeft + data.topRight + data.bottomLeft + data.bottomRight;
    }
  };

})(window.smartMirror || (window.smartMirror = {}));
