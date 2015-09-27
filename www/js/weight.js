(function (exports) {

  var newUserTemplate = _.template(document.getElementById("new-user-template").innerHTML);
  var editUserTemplate = _.template(document.getElementById("edit-user-template").innerHTML);
  var welcomeUserTemplate = _.template(document.getElementById("welcome-user-template").innerHTML)
  var template = _.template(document.getElementById("weight-template").innerHTML);
  var bufferSize = 20;
  var precision = 0.01;
  var utils = smartMirror.utils;
  var api = smartMirror.api;
  var request = null;
  var user_id = 0;

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

      if( utils.isOnOneFoot(data) ) {
        request = api.get_edit_link(user_id);
        request.success(function(){
          html = editUserTemplate({name: data.name});
          $('.weight-content', self).html(html);
        });
      }

      weight = utils.totalWeight(data);

      if (prevMeasurements.length >= bufferSize) {
      	if (deviation < precision) {
          //maybe add a bool variabile to know if you should listen or not
          balanceBoard.off("data", onData);

      	  request = api.login(weight);
      	  request.success(handleLogin);
      	}
      }

      prevMeasurements.push(weight);
      prevMeasurements = prevMeasurements.slice(-bufferSize);

      render();
    }

    function handleLogin (data) {
      var html;

      if (data.status === "not_found") {
	        html = newUserTemplate({qrURL: data.qr_code});

          var checkIntervalId = setInterval(function(){
            request = api.check(weight);
        	  request.success(function(data){
              if (data.status === "ok") {
                html = welcomeUserTemplate({name: data.name});
                user_id = data.id;
                $('.weight-content', self).html(html);

                clearInterval(checkIntervalId);
              }
            });
          }, 5000);
      } else {
	         html = welcomeUserTemplate({name: data.name});
           user_id = data.id;
      }

      self.classList.add("show-content");

      $('.weight-content', self).html(html);
    }

    function render () {
      self.innerHTML = template({weight: weight});
    }

    render();

    setTimeout(function () {
      balanceBoard.on("data", onData);
    }, 500);

    return function () {
      if (request) {request.abort();}

      self.classList.remove("show-content");
      self.classList.remove("weight-widget")
      balanceBoard.off("data", onData);
    };
  }


}(window.smartMirror || (window.smartMirror = {})));
