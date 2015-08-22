var getAirlines = require('./getAirlines');
var getCost = require('./getCost');
var sortAirlines = require('./sortAirlines');

function getFlights(cb) {
    getAirlines(function (err, airlines) {
        if (err) {
            cb(err);
        }
        var flightCosts = [];
        var airlinesCounter = airlines.length;
        airlines.forEach(function (airline, index) {
            getCost(airline, function (err, cost) {
                if (err) {
                    cb(err);
                }
                flightCosts[index] = cost;
                if (--airlinesCounter === 0) {
                    var sortedAirlines = sortAirlines(airlines, flightCosts);
                    cb(null, sortedAirlines);
                }
            })
        });
    });
}

var times = [];
var count = 1000;
var begin = process.hrtime()

function step() {
    var beginTime = process.hrtime();
    getFlights(function (err) {
        if (err) {
            console.error(err);
        } else {
            var diff = process.hrtime(beginTime);
            times.push(diff[0] * 1e9 + diff[1]);
            if (--count) {
                step();
            } else {
                printResult(times);
            }
        }
    });
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

step();
