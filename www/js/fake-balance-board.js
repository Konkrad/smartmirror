(function (exports) {

  var weight = 68;

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

	  setTimeout(function () {

	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    fn(getData(weight));
	    setTimeout(function () {
	      //fn(getData(weight));

	    }, 1000);

	  }, 0);
	}
      },
      off: function () {}
    }
  };

})(window)
