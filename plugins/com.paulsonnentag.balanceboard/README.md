# cordova-plugin-balance-board
Cordova plugin to connect to the Wii Fit Balance Board. You can use the Balance Board to get weight measurements with your app or as a controller for games.
This plugin is **only compatible with Android <= 4.1.x**, because newer Android versions no longer support l2cap bluetooth connections (see https://code.google.com/p/android/issues/detail?id=58164).

This is just a small wrapper around the bluetooth communication code of the [fitscale](https://github.com/paulburton/fitscales) app by [paulburton](https://github.com/paulburton) so all credit should go to him for doing the hard work.

## Instalation

```bash
cordova plugin add https://github.com/BrackCurly/cordova-plugin-balance-board.git
```

## Usage

You have to press the red button under the battery cover of your Balance Board than you can connect with it.

## API

### Initialization

```javascript

// call before you can interact with the Balance Board
// rescanns for bluetooth devices until Balance Board is found or balanceBoard.disconnect is called
balanceBoard.connect()

// call to close connection with Balance Board
balanaceBoard.disconnect();
```

### Events
```javascript

balanceBoard.on('discovered', function () {
console.log('balance board has been discovered');
});

balanceBoard.on('connecting', function () {
console.log('started connecting with balance board');
});

balanceBoard.on('connected', function () {
console.log('connected to balance board');
});

balanceBoard.on('disconnected', function () {
// known issue: this event is only triggered if the Balance Board is disconnected properly
// not if the power is turned of

console.log('balance board disconnected');
});

balance.board.on('data', function (data) {
// weight applied at each point in kg
// hint: you have to zeroize the data yourself
var tl = data.topLeft;
var tr = data.topRight;
var bl = data.bottomLeft;
var br = data.bottomRight;

// to calculate the total weight just add everything up;
var weight = tl + tr + bl + br;
console.log("measured weight: %i kg", weight);
});

```
