var Bleacon = require('bleacon');

var uuid = 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0';
var major = 1;
var minor = 2;
var measuredPower = -59;

console.log('starting advertising ...');
Bleacon.startAdvertising(uuid, major, minor, measuredPower);
