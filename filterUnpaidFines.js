module.exports = function filterUnpaidFines(fines, isUnpaidFines) {
    var unpaidFines = [];
    fines.forEach(function (fine, index) {
        if (isUnpaidFines[index]) {
            unpaidFines.push(fine);
        }
    });
    return unpaidFines;
};
