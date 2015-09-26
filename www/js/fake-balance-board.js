(function (exports) {

  var weight = 60;

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
	      fn(getData(weight));

	    }, 500);

	  }, 1000);
	}
      },
      off: function () {}
    }
  };

})(window)
