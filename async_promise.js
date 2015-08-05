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

getUnpaidFines('A263BC')
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
