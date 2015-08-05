module.exports = function isFineUnpaid(fine) {
    var cb = arguments[arguments.length - 1];
    console.log('isFineUnpaid start', fine);
    setTimeout(function () {
        console.log('isFineUnpaid end', fine);
        cb(null, Math.random() > 0.7);
    }, 50);
};
