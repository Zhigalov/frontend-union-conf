var spawn = require('child_process').spawn;
var thunkify = require('thunkify');
var Promise = require('bluebird');
var co = require('co');
var MAX_COUNT = 1000;

function *step(runner, params, count) {
    var node = spawn(runner, params.concat('--airlinesCount=' + count));

    node.stdout.on('data', function (data) {
        process.stdout.write(data.toString());
    });

    node.stderr.on('data', function (data) {
        console.error(data);
    });

    yield new Promise(function (resolve) {
        node.on('close', resolve)
    });

    count += 50;
    count < MAX_COUNT && (yield step(runner, params, count));
}

co(function *() {
    console.log('async_cb');
    yield step('node', ['async_cb.js'], 10);

    console.log('async_promise');
    yield step('node', ['async_promise.js'], 10);

    console.log('async_generator');
    yield step('node', ['async_generator.js'], 10);

    //console.log('async_generator_babel');
    //yield step('node', ['async_generators_babel.js'], 10);

    //console.log('async_traceur');
    //yield step('./node_modules/.bin/traceur', ['--experimental', 'async_awayt.js'], 10);
})
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
