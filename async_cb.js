var getAirlines = require('./getAirlines');
var getCost = require('./getCost');
var sortAirlines = require('./sortAirlines');
var printBenchmark = require('./printBenchmark');
var argv = require('minimist')(process.argv.slice(2));

var times = [];
var repeatCount = argv.repeatCount || 1000;
var airlinesCount = argv.airlinesCount || 100;
var begin = process.hrtime();

function getFlights(cb) {
    getAirlines(airlinesCount, function (err, airlines) {
        if (err) {
            return cb(err);
        }
        var flightCosts = [];
        var airlinesCounter = airlines.length;

        for (var index = 0; index < airlines.length; index++) {
            var airline = airlines[index];
            getCost(airline, function (err, cost) {
                if (err) {
                    return cb(err);
                }
                flightCosts[index] = cost;
                if (--airlinesCounter === 0) {
                    var sortedAirlines = sortAirlines(airlines, flightCosts);
                    cb(null, sortedAirlines);
                }
            })
        }
    });
}

function step() {
    var beginTime = process.hrtime();
    getFlights(function (err) {
        var diff = process.hrtime(beginTime);
        if (err) {
            console.error(err);
        } else {
            times.push(diff[0] * 1e9 + diff[1]);
            if (--repeatCount) {
                step();
            } else {
                printBenchmark(times);
            }
        }
    });
}

step();
