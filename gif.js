$(document).ready(function() {

    // Declare the set of global variables to be used
    var queryURLBase = "http://api.giphy.com/v1/gifs/search?";
    var apiKey = "&api_key=dc6zaTOxFJmzC";
    var limitSearch = "&limit=9&rating=pg-13";
    var queryURL = "";
    var topic = "";
    var results = "";

    // Create a series of arrays to hold the topic buttons at the top of page and GIFs in the body of page
    var topicsArray = [];
    var gifArray = [];
    var topArray = [];
    var midArray = [];
    var botArray = [];

    // Create the fucntion that will identify a button click and ping the Giphy API with that input
    $("button").on("click", function(){
      var topic = $(this).attr("data-topic");
      queryURL = queryURLBase + "q=" + topic + limitSearch + apiKey;

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(giphyResponse) {
          results = giphyResponse.data;
          


        })
    })


});
