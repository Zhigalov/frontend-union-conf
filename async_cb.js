var getFinesByCarNumber = require('./getFinesByCarNumber');
var isFineUnpaid = require('./isFineUnpaid');
var filterUnpaidFines = require('./filterUnpaidFines');

function getUnpaidFines(carNumber, cb) {
    getFinesByCarNumber(carNumber, function (err, fines) {
        if (err) { cb(err); }
        var isUnpaidFines = [];
        var finesCounter = fines.length;
        fines.forEach(function (fine, index) {
            isFineUnpaid(fine, function (err, isUnpaid) {
                if (err) { cb(err); }
                isUnpaidFines[index] = isUnpaid;
                if (--finesCounter === 0) {
                    var unpaidFines = filterUnpaidFines(fines, isUnpaidFines);
                    cb(null, unpaidFines);
                }
            })
        });
    });
}

getUnpaidFines('A263BC', function (err, unpaidFines) {
    if (err) {
        console.error(err);
    } else {
        console.log(unpaidFines);
    }
});
