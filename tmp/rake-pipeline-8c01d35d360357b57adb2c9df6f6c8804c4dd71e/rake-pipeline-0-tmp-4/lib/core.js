
loader.register('plain_tube/core', function(require) {
require('jquery');
require('bootstrap');
require('handlebars');
require('ember');
require('ember-data');
require('plain_tube/ext');
require('plain_tube/env');

App = Ember.Application.create({
  VERSION: '0.1.0'
});

});
