var _ = require('lodash');

module.exports = function filterUnpaidFines(fines, isUnpaidFines) {
    return _.filter(fines, function (fine, index) {
        return isUnpaidFines[index];
    });
};
