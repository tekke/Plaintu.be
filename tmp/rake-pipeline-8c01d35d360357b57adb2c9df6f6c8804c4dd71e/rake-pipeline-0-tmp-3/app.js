
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

loader.register('plain_tube/controllers', function(require) {
require('plain_tube/controllers/application');
require('plain_tube/controllers/video_controller');
require('plain_tube/controllers/search_controller');

});

loader.register('plain_tube/controllers/application', function(require) {
require('plain_tube/core');

App.ApplicationController = Ember.Controller.extend();

});

loader.register('plain_tube/controllers/search_controller', function(require) {
// Results list
App.searchResultsController = Ember.ArrayController.create({
  // there are no videos initially
  content: [],

  // Searching flag
  isSearching: false,

  search: function(query,startIndex) {
   
    var self = this;

    // Start searching and remove existing results
    this.set('isSearching', true);
    this.set('content', []);

    var c = $.getJSON("http://gdata.youtube.com/feeds/api/videos",
        { alt: 'json', format: 5,'max-results': 10, 'start-index': startIndex, v: 2, q: query});

     
    c.success(function(data) {
      var entries = data.feed.entry, results = [];

      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        results.push(App.Video.create({
          id: e.id.$t.split(':')[3],
          seconds: parseInt(e.media$group.yt$duration.seconds),
          title: e.title.$t,
          description: e.media$group.media$description.$t
        }));
      }

      self.set('content', results);
    });


      
    c.complete(function() {
      self.set('isSearching', false);
    });
  }

});

});

loader.register('plain_tube/controllers/video_controller', function(require) {
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
});

loader.register('plain_tube/env', function(require) {
ENV = typeof ENV !== 'undefined' ? ENV : {
	EXPERIMENTAL_CONTROL_HELPER: true
};

});

loader.register('plain_tube/ext', function(require) {
var get = Ember.get,
    fmt = Ember.String.fmt,
    viewProto = Ember.View.proto(), // prepare prototype
    templateForName = viewProto.templateForName;

Ember.View.reopen({
  templateForName: function(name, type) {
    if (!name) return;

    var template = templateForName(name, type);
    if (!template) {
      try {
        template = require(name);
      } catch (e) {
        throw new Ember.Error(fmt('%@ - Unable to find %@ "%@".', [this, type, name]));
      }
    }
    return template;
  }
});

});

loader.register('plain_tube/handlebars_helpers', function(require) {
/* 
Hendlebars Helpers
*/

Ember.Handlebars.registerBoundHelper('embeddingBy', function(embedding) {
// var embed = '<div class="video-wrapper"><object width= "425" height="344"><param name="movie" value="http://www.youtube.com/v/' + embedding + '?version=3&ap=%2526fmt%3D18&autoplay=1&rel=0&color1=0xF7F7F7&theme=light&iv_load_policy=3"></param><param name="allowFullScreen" value="true"></param><embed src="http://www.youtube.com/v/' + embedding + '?version=3&ap=%2526fmt%3D18&autoplay=1&rel=0&color1=0xF7F7F7&theme=light&iv_load_policy=3" type="application/x-shockwave-flash" allowfullscreen="true" width="425" height="344"></embed></object></div>';	
var embed = '<div class="video-wrapper"><iframe width="420" height="315" src="http://www.youtube.com/embed/'+ embedding +'?rel=0&autoplay=1&theme=light&iv_load_policy=3" frameborder="0" allowfullscreen></iframe></div>';
return new Ember.Handlebars.SafeString(embed);

});


Ember.Handlebars.registerBoundHelper('repeatEmbeddingBy', function(embedding) {
var embed = '<div class="video-wrapper"><object width= "425" height="344"><param name="movie" value="http://www.youtube.com/v/' + embedding + '?version=2&ap=%2526fmt%3D18&autoplay=1&rel=0&color1=0xF7F7F7&loop=1"></param><param name="allowFullScreen" value="true"></param><embed src="http://www.youtube.com/v/' + embedding + '?version=2&ap=%2526fmt%3D18&autoplay=1&rel=0&color1=0xF7F7F7&loop=1" type="application/x-shockwave-flash" allowfullscreen="true" width="425" height="344"></embed></object></div>';	
return new Ember.Handlebars.SafeString(embed);

});


Ember.Handlebars.registerBoundHelper('imageBy', function(id){
var image = '<img src="http://img.youtube.com/vi/' + id + '/0.jpg" class="img-rounded" width="420" height="255">';
return new Ember.Handlebars.SafeString(image);

});

Ember.Handlebars.registerBoundHelper('loadingImg',function(){
var gif = '<img src="http://sierrafire.cr.usgs.gov/images/loading.gif"/>';
return new Ember.Handlebars.SafeString(gif);

});
});

loader.register('plain_tube/main', function(require) {
require('plain_tube/core');
require('plain_tube/store');
require('plain_tube/router');
require('plain_tube/controllers');
require('plain_tube/views');
require('plain_tube/handlebars_helpers');

});

loader.register('plain_tube/models/about', function(require) {

});

loader.register('plain_tube/router', function(require) {
require('plain_tube/core');

App.Router = Ember.Router.extend({
  enableLogging: true,
  location: 'history',

  // root: Ember.Route.extend({
  //   index: Ember.Route.extend({
  //     route: '/'
  //   })
  // })
});

App.Router.map(function() {
  this.resource('about');
  this.resource('videos',{path: '/'}, function() {
    this.resource('video', { path: '/watch?v=\/' + ':video_id' });
  });

});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('videos');
  }
});


// App.VideosRoute = Ember.Route.extend({
//    model: function(){
//     var currentId = window.location.hash.split('/')[1];

//    return;App.Video.set('id', currentId);
    
//    }
// });
});

loader.register('plain_tube/store', function(require) {
require('plain_tube/core');

App.Video = Ember.Object.extend({
  id: null,
  title: null,
  seconds: null,
  description: null
});

});

loader.register('plain_tube/views', function(require) {
require('plain_tube/views/application');
require('plain_tube/views/videos/main-index');
require('plain_tube/views/videos/show');
require('plain_tube/views/videos/videos-at-index');

});

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

loader.register('plain_tube/views/videos/main-index', function(require) {
// Search box + suggestions

App.SearchBox = Ember.TextField.extend({

didInsertElement: function() {
    this.$().focus();  
    App.searchResultsController.search(''); 
    $("#search-box").autocomplete({
      source: function(request, response) {
            $.getJSON("http://suggestqueries.google.com/complete/search?callback=?",
                { 
                  "hl":"en", 
                  "ds":"yt",
                  "jsonp":"suggestCallBack",
                  "q":request.term, 
                  "client":"youtube"
                }
            );
      suggestCallBack = function (data) {
                var suggestions = [];
                $.each(data[1], function(key, val) {
                    suggestions.push({"value":val[0]});
                });
                suggestions.length = 10;
                response(suggestions);
            };
        }
    });  
      window.onscroll = function() {
      
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        var numb = parseInt($('#start-index').text(), 10);
         
         parseInt($('#start-index').text(numb + 10 ), 10);
         startIndex = parseInt($('#start-index').text(), 10);
         
        App.searchResultsController.search(window.query, startIndex);
          
       }
    }        
},

insertNewline: function() {
  parseInt($('#start-index').text(0), 10);
     window.query = this.get('value');
    App.searchResultsController.search(query);
 },

});




});

loader.register('plain_tube/views/videos/show', function(require) {
// App.isNowPlaying = Ember.View.extend({
// didInsertElement: function(){
//   	var currentId = window.location.hash.split('/')[1];
//   	// alert(currentId);
//   	var anchor = 'a[href$='+ currentId+ ']';
//   	$('a').removeClass('image');
//   	$(anchor.toString()).toggleClass('image');
	
// 	}
// });
});

loader.register('plain_tube/views/videos/videos-at-index', function(require) {
App.indexVideos = Ember.View.extend({
  didInsertElement: function(){
  App.videosAtIndexController.search("youtube");
  }
});
});
