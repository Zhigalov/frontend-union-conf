var Promise = require('bluebird');
var getFinesByCarNumber = Promise.promisify(require('./getFinesByCarNumber'));
var isFineUnpaid = Promise.promisify(require('./isFineUnpaid'));
var filterUnpaidFines = require('./filterUnpaidFines');

function getUnpaidFines(carNumber) {
    return getFinesByCarNumber(carNumber)
        .then(function (fines) {
            return Promise.props({
                fines: fines,
                isUnpaidFines: Promise.all(fines.map(isFineUnpaid))
            });
        })
        .then(function (data) {
            return filterUnpaidFines(data.fines, data.isUnpaidFines)
        });
}

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
