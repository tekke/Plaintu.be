
loader.register('plain_tube/store', function(require) {
require('plain_tube/core');

App.Video = Ember.Object.extend({
  id: null,
  title: null,
  seconds: null,
  description: null
});

});
