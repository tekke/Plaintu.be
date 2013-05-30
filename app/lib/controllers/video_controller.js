App.videosAtIndexController = Ember.ArrayController.create({
  // there are no videos initially
  content: [],

  // Searching flag
  isSearching: false,

  search: function(query) {
   
    var self = this;

    // Start searching and remove existing results
    this.set('isSearching', true);
    this.set('content', []);

    var c = $.getJSON("http://gdata.youtube.com/feeds/api/videos",
        { alt: 'json', 'max-results': 9, v: 2, q: query });

    c.success(function(data) {
      var entries = data.feed.entry, results = [];

      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        results.push(App.Video.create({
          id: e.id.$t.split(':')[3],
          seconds: parseInt(e.media$group.yt$duration.seconds),
          title: e.title.$t
        }));
      }

      self.set('content', results);
    });
      
    c.complete(function() {
      self.set('isSearching', false);
    });
  }
});

// 
App.VideoController = Ember.ObjectController.extend({
  isRepeating: false,
  repeat: function() {
    this.set('isRepeating', true);
  },
  notRepeating: function (){
    this.set('isRepeating', false);
  }
});