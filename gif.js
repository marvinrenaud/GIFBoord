$(document).ready(function() {

    // Declare the set of global variables to be used
    var queryURLBase = "https://api.giphy.com/v1/gifs/search?";
    var apiKey = "&api_key=dc6zaTOxFJmzC";
    var limitSearch = "&limit=9&rating=pg-13";
    var queryURL = "";
    var topic = "";
    var userTopic = "";
    var results = "";
    var ratingDisplay = "";
    var photoStillStore = "";
    var photoGifStore = "";
    var phototDisplay = "";
    var packageDisplay = "";


    // Create a series of arrays to hold the topic buttons at the top of page and GIFs in the body of page
    var topicsArray = [];
    var gifArray = [];
    var topArray = [];
    var midArray = [];
    var botArray = [];


    // Create the fucntion that will identify a button click and ping the Giphy API with that input
    $(document).on("click", "button", function() {
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
        console.log("Click Registered");

        //If this is the user input submit button, add a button then proceed
        if ($(this).attr("id") == "submitButton") {
            topic = $("input").val();
            $("#userButtons").append("<button class='btn btn-info userTopicButton topicButton' data-topic='" + topic + "'> " + topic + "</button>");
            // Create the queryURL based on the button clicked
            queryURL = queryURLBase + "q=" + topic + limitSearch + apiKey;
            console.log(queryURL);
        } else {
            // Create the queryURL based on the button clicked
            topic = $(this).attr("data-topic");
            queryURL = queryURLBase + "q=" + topic + limitSearch + apiKey;
            console.log(queryURL);
        };

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // Grab the API response and store in a variable, results
            .done(function(giphyResponse) {
                results = giphyResponse.data;
                // For the first three gifs, store key values in variables and store in an array
                for (var i = 0; i < 3; i++) {
                    ratingDisplay = results[i].rating;
                    photoStillStore = "<img class='gifImage' src ='" + results[i].images.fixed_height_still.url + "'>";
                    photoGifStore = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "'>";
                    // Collapse these two values into a single value to display in a div within the array
                    photoDisplay = "<div class='col-md-4'>" + ratingDisplay + "<br>" + "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='animate'>" + "</div>";
                    topArray.push(photoDisplay);
                }

                // Know there is probably a cleaner way to code this vs copy/pasting but couldn't figure it out in time :-(
                for (var i = 3; i < 6; i++) {
                    ratingDisplay = results[i].rating;
                    photoStillStore = "<img class='gifImage' src ='" + results[i].images.fixed_height_still.url + "'>";
                    photoGifStore = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "'>";
                    photoDisplay = "<div class='col-md-4'>" + ratingDisplay + "<br>" + "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='animate'>" + "</div>";
                    midArray.push(photoDisplay);
                }

                for (var i = 6; i < 9; i++) {
                    ratingDisplay = results[i].rating;
                    photoStillStore = "<img class='gifImage' src ='" + results[i].images.fixed_height_still.url + "'>";
                    photoGifStore = "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "'>";
                    photoDisplay = "<div class='col-md-4'>" + ratingDisplay + "<br>" + "<img class='gifImage' src ='" + results[i].images.fixed_height.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='animate'>" + "</div>";
                    botArray.push(photoDisplay);
                }


                // Write the three gif arrays to the screen across three divs
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
        // Clear the input form
        $("input").val("");

    })



});
