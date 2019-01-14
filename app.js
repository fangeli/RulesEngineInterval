'use strict';

console.log('Hello MaintenanceNode');

var index = require('./index');

//test giorno e ora ok
var timestamp = "20181203152308";
var intervalValidity = '{"key": "week", "week": {"days": [1, 2, 4], "hours": [{"to": "17:00:00", "from": "06:00:00"}]}}';
var success = index.isEventTimeValidity(timestamp, intervalValidity);
console.log(success);

//test giorno ok e ora ko
timestamp = "20181203172308";
intervalValidity = '{"key": "week", "week": {"days": [1, 2, 4], "hours": [{"to": "17:00:00", "from": "06:00:00"}]}}';
success = index.isEventTimeValidity(timestamp, intervalValidity);
console.log(success);

//test giorno ko
timestamp = "20181202172308";
intervalValidity = '{"key": "week", "week": {"days": [1, 2, 4], "hours": [{"to": "17:00:00", "from": "06:00:00"}]}}';
success = index.isEventTimeValidity(timestamp, intervalValidity);
console.log(success);

//test always
timestamp = "20181202172308";
intervalValidity = '{"key": "always", "week": {"days": [], "hours": []}}';
success = index.isEventTimeValidity(timestamp, intervalValidity);
console.log(success);

//test always
timestamp = "20181202172308";
intervalValidity = '{"key": "always"}';
success = index.isEventTimeValidity(timestamp, intervalValidity);
console.log(success);

//test ok
timestamp = "20181203182308";
intervalValidity = '{"key": "week", "week": {"days": [1, 2, 4], "hours": [{"to": "17:00:00", "from": "06:00:00"}, {"to": "19:00:00", "from": "18:00:00"}]}}';;
success = index.isEventTimeValidity(timestamp, intervalValidity);
console.log(success);

//test ko
timestamp = "20181203192308";
intervalValidity = '{"key": "week", "week": {"days": [1, 2, 4], "hours": [{"to": "17:00:00", "from": "06:00:00"}, {"to": "19:00:00", "from": "18:00:00"}]}}';;
success = index.isEventTimeValidity(timestamp, intervalValidity);
console.log(success);



