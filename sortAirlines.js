module.exports = function sortAirlines(airlines, flightsCost) {
    return airlines.sort(function (a, b) {
        return flightsCost[airlines.indexOf(a)] - flightsCost[airlines.indexOf(b)];
    });
};
