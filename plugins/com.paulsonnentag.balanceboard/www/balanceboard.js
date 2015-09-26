'use strict';

var noop = function () {}

var balanceBoard = new EventEmitter();

function getEvents (callback) {
  cordova.exec(callback, noop, 'BalanceBoard', 'getEvents', [])
}

function eventLoop () {
  getEvents(function (events) {

    events.forEach(function (event) {
      balanceBoard.emit(event.type, event.data);
    });

    setTimeout(eventLoop, 10);
  });
}

document.addEventListener('deviceready', eventLoop, false);

balanceBoard.connect = function () {
  cordova.exec(noop, function (err) {
    console.log('error connect', err);
  }, 'BalanceBoard', 'connect', [])
};

balanceBoard.disconnect = function () {
  cordova.exec(noop, function (err) {
    console.log('err disconnect', err);
  }, 'BalanceBoard', 'disconnect', [])
}

module.exports = balanceBoard;
