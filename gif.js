$(document).ready(function() {

    // Declare the set of global variables to be used
    var queryURLBase = "http://api.giphy.com/v1/gifs/search?";
    var apiKey = "&api_key=dc6zaTOxFJmzC";
    var limitSearch = "&limit=9&rating=pg-13";
    var queryURL = "";
    var topic = "";
    var userTopic = "";
    var results = "";
    var ratingStore = "";
    var ratingDisplay = "";
    var photoStillStore = "";
    var photoStillDisplay = "";
    var photoGifStore = "";
    var phototDisplay = "";
    var packageDisplay = "";

    // Create a series of arrays to hold the topic buttons at the top of page and GIFs in the body of page
    var topicsArray = [];
    var gifArray = [];
    var topArray = [];
    var midArray = [];
    var botArray = [];

    $("#submitButton").on("click", function(event){
      event.preventDefault();

      $("#topRow").empty();
      $("#middleRow").empty();
      $("#bottomRow").empty();

      topicsArray = [];
      gifArray = [];
      topArray = [];
      midArray = [];
      botArray = [];

      // Create the queryURL based on the button clicked
      topic = $("input").val();
      console.log("Test: " + topic);
      queryURL = queryURLBase + "q=" + topic + limitSearch + apiKey;
      console.log(queryURL);

      $.ajax({
              url: queryURL,
              method: "GET"
          })
          .done(function(giphyResponse) {
              results = giphyResponse.data;
              for (var i = 0; i < 3; i++) {
                  ratingDisplay = results[i].rating;
                  photoStillStore = "<img class='gifImage' src ='" + results[i].images.fixed_height_still.url + "'>";
                  photoGifStore = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "'>";
                  photoDisplay = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='animate'>";
                  topArray.push(photoDisplay);
              }

              for (var i = 3; i < 6; i++) {
                  ratingDisplay = results[i].rating;
                  photoStillStore = "<img class='gifImage' src ='" + results[i].images.fixed_height_still.url + "'>";
                  photoGifStore = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "'>";
                  photoDisplay = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='animate'>";
                  midArray.push(photoDisplay);
              }

              for (var i = 6; i < 9; i++) {
                  ratingDisplay = results[i].rating;
                  photoStillStore = "<img class='gifImage' src ='" + results[i].images.fixed_height_still.url + "'>";
                  photoGifStore = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "'>";
                  photoDisplay = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='animate'>";
                  botArray.push(photoDisplay);
              }


              // Write the arrays to the screen across three divs
              $("#topRow").html(topArray);
              $("#middleRow").html(midArray);
              $("#bottomRow").html(botArray);

              // Capture click on each gif and pivot to/from still graphic on each click
              $(".gifImage").on("click", function() {
                  var state = $(this).attr('data-state');

                  if (state == "still") {
                      $(this).attr('data-state', "animate");
                      $(this).attr('src', $(this).attr('data-animate'));

                  } else {
                      $(this).attr('data-state', "still");
                      $(this).attr('src', $(this).attr('data-still'))
                  }


              })




          })
    })



    // Create the fucntion that will identify a button click and ping the Giphy API with that input
    $(".topicButton").on("click", function() {
        event.preventDefault();
        // These lines clear the content from the previous button click
        $("#topRow").empty();
        $("#middleRow").empty();
        $("#bottomRow").empty();

        topicsArray = [];
        gifArray = [];
        topArray = [];
        midArray = [];
        botArray = [];

        // Create the queryURL based on the button clicked
        topic = $(this).attr("data-topic");
        queryURL = queryURLBase + "q=" + topic + limitSearch + apiKey;
        console.log(queryURL);

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(giphyResponse) {
                results = giphyResponse.data;
                for (var i = 0; i < 3; i++) {
                    ratingDisplay = results[i].rating;
                    photoStillStore = "<img class='gifImage' src ='" + results[i].images.fixed_height_still.url + "'>";
                    photoGifStore = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "'>";
                    photoDisplay = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='animate'>";
                    topArray.push(photoDisplay);
                }

                for (var i = 3; i < 6; i++) {
                    ratingDisplay = results[i].rating;
                    photoStillStore = "<img class='gifImage' src ='" + results[i].images.fixed_height_still.url + "'>";
                    photoGifStore = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "'>";
                    photoDisplay = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='animate'>";
                    midArray.push(photoDisplay);
                }

                for (var i = 6; i < 9; i++) {
                    ratingDisplay = results[i].rating;
                    photoStillStore = "<img class='gifImage' src ='" + results[i].images.fixed_height_still.url + "'>";
                    photoGifStore = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "'>";
                    photoDisplay = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='animate'>";
                    botArray.push(photoDisplay);
                }


                // Write the arrays to the screen across three divs
                $("#topRow").html(topArray);
                $("#middleRow").html(midArray);
                $("#bottomRow").html(botArray);

                // Capture click on each gif and pivot to/from still graphic on each click
                $(".gifImage").on("click", function() {
                    var state = $(this).attr('data-state');

                    if (state == "still") {
                        $(this).attr('data-state', "animate");
                        $(this).attr('src', $(this).attr('data-animate'));

                    } else {
                        $(this).attr('data-state', "still");
                        $(this).attr('src', $(this).attr('data-still'))
                    }


                })




            })
    })



});
