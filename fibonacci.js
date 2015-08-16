"use strict";

function* fibonacci() {
    var fn1 = 1;
    var fn2 = 1;
    while (true) {
        var current = fn2;
        fn2 = fn1;
        fn1 = fn1 + current;
        yield current;
    }
}
var it = fibonacci();

console.log(it.next().value); // 1
console.log(it.next().value); // 1
console.log(it.next().value); // 2
console.log(it.next().value); // 3
console.log(it.next().value); // 5
