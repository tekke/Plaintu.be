
loader.register('plain_tube/views/application', function(require) {
require('plain_tube/core');

App.ApplicationView = Ember.View.extend({
  templateName: 'plain_tube/~templates/application'
});

App.AboutView = Ember.View.extend({
  templateName: 'plain_tube/~templates/about'
});

App.VideosView = Ember.View.extend({
  templateName: 'plain_tube/~templates/videos/index'
});

App.VideosIndexView = Ember.View.extend({
  templateName: 'plain_tube/~templates/videos/videos-index'
});

App.VideoView = Ember.View.extend({
  templateName: 'plain_tube/~templates/videos/show'
});

});
