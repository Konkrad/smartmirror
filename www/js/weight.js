(function (exports) {

  var newUserTemplate = _.template(document.getElementById("new-user-template").innerHTML);
  var welcomeUserTemplate = _.template(document.getElementById("welcome-user-template").innerHTML)
  var template = _.template(document.getElementById("weight-template").innerHTML);
  var bufferSize = 5;
  var precision = 0.01;
  var utils = smartMirror.utils;
  var api = smartMirror.api;

  function average (average, measurement, i, measurements) {
    return average + (measurement / measurements.length);
  }

  exports.weightWidget = function () {
    var self = this;
    var prevMeasurements = [];
    var weight = 0;

    this.classList.add("weight-widget");

    function onData (data) {
      var avgMeasurement = _.reduce(prevMeasurements, average, 0);
      var deviation = Math.abs(weight -  avgMeasurement);

      weight = utils.totalWeight(data);

      if (prevMeasurements.length >= bufferSize) {
	if (deviation < precision) {
	  balanceBoard.off("data", onData);

	  api.login(weight).success(handleLogin);
	}
      }

      prevMeasurements.push(weight);
      prevMeasurements = prevMeasurements.slice(-bufferSize);

      render();
    }

    function handleLogin (data) {
      var html;

      if (data.status === "not_found") {
	html = newUserTemplate({qrURL: data.qr_code})
      } else {
	html = welcomeUserTemplate({name: data.name});
      }

      self.classList.add("show-content");

      $('.weight-content', self).html(html);
    }

    function render () {
      self.innerHTML = template({weight: weight});
    }


    render();

    balanceBoard.on("data", onData);

    return function () {
      self.classList.remove("show-content");
      balanceBoard.off("data", onData);
    };
  }


}(window.smartMirror || (window.smartMirror = {})));
