
loader.register('plain_tube/views/videos/videos-at-index', function(require) {
App.indexVideos = Ember.View.extend({
  didInsertElement: function(){
  App.videosAtIndexController.search("youtube");
  }
});
});
