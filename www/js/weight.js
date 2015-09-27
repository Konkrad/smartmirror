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
  var timeout = null;
  var user_id = 0;

  var widget = smartMirror.widget;
  var qodWidget = smartMirror.qodWidget;
  var giphyWidget = smartMirror.giphyWidget;
  var flickrWidget = smartMirror.flickrWidget;
  var vineWidget = smartMirror.vineWidget;
  var calendarWidget = smartMirror.calendarWidget;

  function average (average, measurement, i, measurements) {
    return average + (measurement / measurements.length);
  }

  exports.weightWidget = function () {
    var self = this;
    var prevMeasurements = [];
    var weight = 0;

    this.classList.add("weight-widget");

    console.log("init weight widget");

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
      if (data.status === "not_found") {
 	$('.weight-content', self).html(newUserTemplate({qrURL: data.qr_code}));

      } else {
	$('.weight-content', self).html(welcomeUserTemplate({name: data.name}));
	user_id = data.id;

	timeout = setTimeout(function () {
	  addWidgets();
	}, 500);

	drawChart(data.history);
      }

      self.classList.add("show-content");
    }

    function addWidgets () {
      widget.add(qodWidget);
      widget.add(giphyWidget);
      widget.add(flickrWidget);
      //widget.add(vineWidget);
    }

    function drawChart (progress) {
      var padding = 20;
      var width = 375;
      var height = 250;
      var chart = d3.select("#chart");

      progress = progress.sort(function (a, b) {return a.day - b.day}).slice(-14);

      var xRange = d3.scale.linear()
	.range([0, width])
	.domain([
	  d3.min(progress, function(d) {return d.day;}),
	  d3.max(progress, function(d) {return d.day;})
	]);

      var yRange = d3.scale.linear()
	.range([0, height - 2*padding])
	.domain([
	  d3.min(progress, function(d) {return d.weight;}),
	  d3.max(progress, function(d) {return d.weight;})
	]);


      var lineFunc = d3.svg.line()
	.x(function(d) {
	  return xRange(d.day);
	})
	.y(function(d) {
	  return height -padding*2 - yRange(d.weight);
	})
	.interpolate('basis');


      var path = chart
	.append('svg:g')
	.attr('transform', 'translate(0, '+ padding +')')
	.append('svg:path')
	.attr('d', lineFunc(progress))
	.attr('stroke', 'white')
	.attr('stroke-width', 2)
	.attr('fill', 'none');

      var totalLength = path.node().getTotalLength();

      path
	.attr("stroke-dasharray", totalLength + " " + totalLength)
	.attr("stroke-dashoffset", totalLength)
	.transition()
	.duration(1000)
	.ease("basis-open")
	.attr("stroke-dashoffset", 0);
    }


    function render () {
      self.innerHTML = template({weight: weight});
    }

    render();

    setTimeout(function () {
      balanceBoard.on("data", onData);
    }, 500);

    return function () {
      console.log("destruct");

      if (request) {request.abort();}
      if (timeout) {clearTimeout(timeout); console.log("clear timeout")}

      self.classList.remove("show-content");
      self.classList.remove("weight-widget")
      balanceBoard.off("data", onData);
    };
  }


}(window.smartMirror || (window.smartMirror = {})));
