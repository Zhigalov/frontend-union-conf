module.exports = function isFineUnpaid(fine) {
    var cb = arguments[arguments.length - 1];
    setTimeout(function () {
        cb(null, Math.random() > 0.7);
    }, 0);
};
