var result = [];

for (var i = 0; i < 100; i++) {
    result.push('airline #' + i);
}

module.exports = function getAirlines(cb) {
    setTimeout(function () {
        cb(null, result);
    }, 0);
};
