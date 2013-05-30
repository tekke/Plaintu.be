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



