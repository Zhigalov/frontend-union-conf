'use strict';

var Promise = require('bluebird');
var co = require('co');
var getAirlines = Promise.promisify(require('./getAirlines'));
var getCost = Promise.promisify(require('./getCost'));
var sortAirlines = require('./sortAirlines');
var printBenchmark = require('./printBenchmark');

var getFlights = co.wrap(function *() {
    var airlines = yield getAirlines();
    var flightCosts = yield airlines.map(getCost);
    return sortAirlines(airlines, flightCosts);
});

var times = [];
var count = 1000;
var begin = process.hrtime();

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

step()
    .then(function () {
        printBenchmark(times)
    });
