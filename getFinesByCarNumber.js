var result = [];

for (var i = 0; i < 100; i++) {
    result.push('fine #' + i);
}

module.exports = function getFinesByCarNumber(carNumber, cb) {
    setTimeout(function () {
        cb(null, result);
    }, 0);
};
