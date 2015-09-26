(function (exports) {

  var weight = 90;

  function getData (v) {
    return {
      topLeft: v/4,
      topRight: v/4,
      bottomLeft: v/4,
      bottomRight: v/4
    };
  }

  if (!window.balanceBoard) {
    exports.balanceBoard = {
      connect: function () {},
      disconnect: function () {},
      on: function (type, fn) {
	if (type == "data") {
	  fn(getData(weight));
	  fn(getData(weight));
	  fn(getData(weight));
	  fn(getData(weight));
	  fn(getData(weight));
	  setTimeout(function () {
	    fn(getData(weight));
	  }, 500);
	}
      },
      off: function () {}
    }
  };

})(window)
