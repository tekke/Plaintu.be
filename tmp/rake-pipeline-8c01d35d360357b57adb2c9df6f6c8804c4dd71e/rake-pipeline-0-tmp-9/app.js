
loader.register('plain_tube/~templates/about', function(require) {

return Ember.Handlebars.compile("<div class=\"hero-unit center\">\n<h1>Built With Ember<small><font face=\"Tahoma\" color=\"#FB8E6B\">JS</font></small></h1>\n<br />\n<p>This App was built as an experiment to see what I could do with Ember and the Youtube Public API.<br /> The Jquery code on this app will eventually be converted to Ember way of doing things.\n<p><b>Get the source code from Github</b></p>\n<a href=\"https://github.com/wilkinn\" class=\"btn btn-large\"><i class=\"icon-code-fork icon-white\"></i> Github</i></a>\n</div>\n\n");

});

loader.register('plain_tube/~templates/application', function(require) {

return Ember.Handlebars.compile("<nav role=\"navigation\" class=\"navbar navbar-fixed-top\">\n  <div class=\"navbar-inner\">\n    <div class=\"container-fluid\">\n    \t {{view App.SearchBox  id=\"search-box\" type=\"text\" placeholder=\"Type / Select then hit 'Enter'\"}}\n      {{#linkTo 'videos'}}<div class=\"brand\">Plain <div class=\"tube\">Tube</div></div>{{/linkTo}}\n      \n      <div class=\"pull-right\">\n        {{#linkTo 'about' }}<button class=\"btn about-info\"><i class=\"icon-info-sign\"></i></button>{{/linkTo}}\n        </div>\n    </div>\n  </div>\n</nav>\n<div id=\"main\" role=\"main\" class=\"container-fluid\">\n  {{outlet}}\n</div>");

});

loader.register('plain_tube/~templates/videos/index', function(require) {

return Ember.Handlebars.compile("<div class=\"container-fluid\">\n      <div class=\"row-fluid\">\n        <div class=\"span3\">\n        \n        \n       \n        {{#if App.searchResultsController.isSearching}}\n       {{loadingImg}}\n        {{/if}}\n        \n        \n\n{{#each App.searchResultsController}}\n <div class=\"row-fluid img-frame\">\n<div class=\"span12 frame\">\n<div class=\"frame\">\n {{#linkTo 'video' this}}\n{{imageBy id}}\n<span class=\"play\">\n<span></span>\n</span>\n{{/linkTo}}\n</div>\n<ul>\n<li class=\"frame-feature\">{{title}}</li>\n</ul>\n</div>\n</div>\n<br/>\n {{/each}}\n\n <div id=\"start-index\">10</div>\n        </div>\n        <div class=\"span9\">\n        <div class=\"right-content-fixed\">\n        \t{{outlet}}\n          </div>\n        </div>\n      </div>\n    </div>\n\n\n\n\n");

});

loader.register('plain_tube/~templates/videos/show', function(require) {

return Ember.Handlebars.compile("{{#if isRepeating}}\n  <span class=\"hint--top\" data-hint=\"Toggles Auto Repeat On / Off\"> \n      <button class=\"btn btn-mini\" {{action 'notRepeating'}}><i class='icon-repeat'></i> is On</button></span><br/>\n       {{repeatEmbeddingBy id}}\n    {{else}}\n    <span class=\"hint--top\" data-hint=\"Toggles Auto Repeat On / Off\"> \n      <button class=\"btn btn-mini\" {{action 'repeat'}} alt=\"Auto Repeat\"><i class='icon-repeat'></i> is Off</button></span>\n      {{embeddingBy id}}\n    {{/if}}");

});

loader.register('plain_tube/~templates/videos/videos-index', function(require) {

return Ember.Handlebars.compile("{{view App.indexVideos}}\n <div class=\"row-fluid img-frame frame-column\">\n {{#each App.videosAtIndexController}}\n<div class=\"span3 frame\">\n<div class=\"frame-img-box\">\n {{#linkTo 'video' this}}\n{{imageBy id}}\n<span class=\"frame\">\n<span></span>\n</span>\n{{/linkTo}}\n\n</div>\n<ul>\n<li class=\"frame-feature text_truncated\">{{title}}</li>\n</ul>\n</div>\n {{/each}}\n</div> \n{{loadingImg}}\n");

});
