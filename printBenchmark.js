module.exports = function printResult(times) {
    //console.log('Median: ' + Math.round(times.sort()[times.length / 2] / 10000));
    //console.log('Avg: ' + Math.round(avg(times) / 10000));
    console.log(Math.round(times.sort()[times.length / 2] / 10000));
};

function avg(array) {
    var sum = array.reduce(function (item, sum) {
        return sum + item;
    }, 0);
    return sum / array.length;
}
