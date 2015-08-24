module.exports = function getAirlines(length, cb) {
    setTimeout(function () {
        var result = [];

        for (var i = 0; i < length; i++) {
            result.push('airline #' + i);
        }

        cb(null, result);
    }, 0);
};
