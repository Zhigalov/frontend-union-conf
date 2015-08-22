module.exports = function getCost(airline) {
    var cb = arguments[arguments.length - 1];
    setTimeout(function () {
        cb(null, Math.random() * 10000);
    }, 0);
};
