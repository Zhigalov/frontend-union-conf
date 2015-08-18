'use strict';

var Promise = require('bluebird');
var co = require('co');
var getFinesByCarNumber = Promise.promisify(require('./getFinesByCarNumber'));
var isFineUnpaid = Promise.promisify(require('./isFineUnpaid'));
var filterUnpaidFines = require('./filterUnpaidFines');

var getUnpaidFines = co.wrap(function *(carNumber) {
    var fines = yield getFinesByCarNumber(carNumber);
    var isUnpaidFines = yield fines.map(isFineUnpaid);
    return filterUnpaidFines(fines, isUnpaidFines);
});

var times = [];
var count = 1000;
var begin = process.hrtime()

function step() {
    var beginTime = process.hrtime();
    return getUnpaidFines('A263BC')
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
