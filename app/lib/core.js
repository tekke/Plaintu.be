require('jquery');
require('bootstrap');
require('handlebars');
require('ember');
require('ember-data');
require('plain_tube/ext');
require('plain_tube/env');

App = Ember.Application.create({
  VERSION: '{{VERSION}}'
});
