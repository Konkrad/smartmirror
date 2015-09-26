(function (exports) {
  var deviceID = 1337;
  var HOST = 'http://smartmirror.sfetea.ro';

  exports.api = {
    login: function (weight) {
      return $.get(HOST + '/users/check', {device_id: deviceID, weight: weight});
    }
  };

}(window.smartMirror || (window.smartMirror = {})));
