(function (exports) {

  var template = _.template(document.getElementById("weight-template").innerHTML);
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

    this.classList.add("weight-widget");
    this.classList.add("show-stats");

    function onData (data) {
      var avgMeasurement = _.reduce(prevMeasurements, average, 0);
      var deviation = Math.abs(weight -  avgMeasurement);

      weight = utils.totalWeight(data);

      if (prevMeasurements.length >= bufferSize) {
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


      self.innerHTML = template({weight: weight});
    }


    render();

    balanceBoard.on("data", onData);

    return function () {
      balanceBoard.off("data", onData);
    };
  }


}(window.smartMirror || (window.smartMirror = {})));
