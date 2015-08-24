var spawn = require('child_process').spawn;
var thunkify = require('thunkify');
var Promise = require('bluebird');
var co = require('co');
var MAX_COUNT = 50;

function *step(script, count) {
    var node = spawn('node', [script, '--airlinesCount=' + count]);

    node.stdout.on('data', function (data) {
        process.stdout.write(data.toString());
    });

    node.stderr.on('data', function (data) {
        console.error(data);
    });

    yield new Promise(function (resolve) {
        node.on('close', resolve)
    });

    count += 10;
    count < MAX_COUNT && (yield step(script, count));
}

co(function *() {
    console.log('async_cb');
    yield step('async_cb.js', 10);

    console.log('async_promise');
    yield step('async_promise.js', 10);

    console.log('async_generator');
    yield step('async_generator.js', 10);
})
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
