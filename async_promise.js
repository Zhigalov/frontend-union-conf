var Promise = require('bluebird');
var getAirlines = Promise.promisify(require('./getAirlines'));
var getCost = Promise.promisify(require('./getCost'));
var sortAirlines = require('./sortAirlines');

function getFlights() {
    return getAirlines()
        .then(function (airlines) {
            return Promise.props({
                airlines: airlines,
                flightCosts: Promise.all(airlines.map(getCost))
            });
        })
        .then(function (data) {
            return sortAirlines(data.airlines, data.flightCosts)
        });
}

var times = [];
var count = 1000;
var begin = process.hrtime()

function step() {
    var beginTime = process.hrtime();
    return getFlights()
        .then(function () {
            var diff = process.hrtime(beginTime);
            times.push(diff[0] * 1e9 + diff[1]);
            if (--count) {
                return step();
            }
        })
        .catch(console.error.bind(console));
}

function printResult() {
    var diff = process.hrtime(begin);
    console.log('Median: ' + times.sort()[times.length / 2]);
    console.log('All / count: ' + (diff[0] * 1e9 + diff[1]) / 1000);
    console.log('Avg: ' + avg(times));
}

function avg(array) {
    var sum = array.reduce(function (item, sum) {
        return sum + item;
    }, 0);
    return sum / array.length;
}

step()
    .then(function () {
        printResult(times)
    });
