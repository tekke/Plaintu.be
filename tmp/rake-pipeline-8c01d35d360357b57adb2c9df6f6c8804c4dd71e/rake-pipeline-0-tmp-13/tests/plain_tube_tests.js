
loader.register('tests/plain_tube_tests', function(require) {
require('plain_tube/core');

module("Plain_tube");

test("App is defined", function () {
  ok(typeof App !== 'undefined', "App is undefined");
});

});
