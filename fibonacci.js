function* fibonacci() {
    var a = 0, b = 1, tmp;

    while (true) {
        yield a;
        tmp = a;
        a = b;
        b = tmp + b;
    }
}

var it = fibonacci();
console.log(it.next().value); // 0
console.log(it.next().value); // 1
console.log(it.next().value); // 1
console.log(it.next().value); // 2
console.log(it.next().value); // 3
console.log(it.next().value); // 5
