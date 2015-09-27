(function (exports) {
  var deviceID = 1337;
  var HOST = 'http://smartmirror.sfetea.ro';

  exports.api = {
    login: function (weight) {
      return $.get(HOST + '/users/check', {device_id: deviceID, weight: weight});
    },
    check: function(weight) {
      return $.get(HOST + '/users/is_created', {device_id: deviceID, weight: weight});
    },
    get_edit_link: function(user_id) {
      return $.get(HOST + '/users/request_edit', {id: user_id});
    }
  };

}(window.smartMirror || (window.smartMirror = {})));
