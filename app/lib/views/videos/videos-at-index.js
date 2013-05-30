App.indexVideos = Ember.View.extend({
  didInsertElement: function(){
  App.videosAtIndexController.search("youtube");
  }
});