(function (exports) {

  var bufferSize = 20;
  var precision = 0.01;
  var utils = smartMirror.utils;

  function average (average, measurement, i, measurements) {
    return average + (measurement / measurements.length);
  }

  exports.weightWidget = function () {
    var self = this;
    var prevMeasurements = [];
    var weight = 0;
    var completed = false;

    function onData (data) {
      var avgMeasurement = _.reduce(prevMeasurements, average, 0);
      var deviation = Math.abs(weight -  avgMeasurement);

      weight = utils.totalWeight(data);

      if (prevMeasurements.length >= bufferSize) {
	console.log(prevMeasurements, weight, deviation);

	if (deviation < precision) {
	  balanceBoard.off("data", onData);
	  completed = true;
	}
      }

      prevMeasurements.push(weight);
      prevMeasurements = prevMeasurements.slice(-bufferSize);

      render();
    }

    function render () {
      self.innerHTML = "<h1>Weight:" + weight  + "</h1>";
    }

    render();

    balanceBoard.on("data", onData);

    return function () {
      balanceBoard.off("data", onData);
    };

  };

}(window.smartMirror || (window.smartMirror = {})));
