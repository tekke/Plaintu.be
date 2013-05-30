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