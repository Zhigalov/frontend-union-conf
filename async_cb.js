var getFinesByCarNumber = require('./getFinesByCarNumber');
var isFineUnpaid = require('./isFineUnpaid');
var filterUnpaidFines = require('./filterUnpaidFines');

function getUnpaidFines(carNumber, cb) {
    getFinesByCarNumber(carNumber, function (err, fines) {
        if (err) {
            cb(err);
        }
        var isUnpaidFines = [];
        var finesCounter = fines.length;
        fines.forEach(function (fine, index) {
            isFineUnpaid(fine, function (err, isUnpaid) {
                if (err) {
                    cb(err);
                }
                isUnpaidFines[index] = isUnpaid;
                if (--finesCounter === 0) {
                    var unpaidFines = filterUnpaidFines(fines, isUnpaidFines);
                    cb(null, unpaidFines);
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
    getUnpaidFines('A263BC', function (err) {
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
