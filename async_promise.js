var Promise = require('bluebird');
var getAirlines = Promise.promisify(require('./getAirlines'));
var getCost = Promise.promisify(require('./getCost'));
var sortAirlines = require('./sortAirlines');
var printBenchmark = require('./printBenchmark');
var argv = require('minimist')(process.argv.slice(2));

var times = [];
var repeatCount = argv.repeatCount || 1000;
var airlinesCount = argv.airlinesCount || 100;
var begin = process.hrtime();

function getFlights() {
    return getAirlines(airlinesCount)
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

function step() {
    var beginTime = process.hrtime();
    return getFlights()
        .then(function () {
            var diff = process.hrtime(beginTime);
            times.push(diff[0] * 1e9 + diff[1]);
            if (--repeatCount) {
                return step();
            }
        })
        .catch(console.error.bind(console));
}

step()
    .then(function () {
        printBenchmark(times)
    });
