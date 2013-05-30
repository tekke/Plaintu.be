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