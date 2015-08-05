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

getUnpaidFines('A263BC')
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
