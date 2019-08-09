$(document).ready(function () {

    var topics = ["The Matrix", "Avengers", "Die Hard", "Star Trek", "Star Wars"];

    function buttonStaging() {
        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("movie");
            button.attr("data-name", topics[i]);
            button.text(topics[i]);
            $("#buttons").append(button);
        }
    }

    $("#add-movie").on("click", function (event) {
        event.preventDefault();

        var movie = $("#searchText").val().trim();
        topics.push(movie);
        console.log(movie);

        buttonStaging();
    });

    buttonStaging();

    // Event listener for all button elements
    $("#buttons").on("click", "button", function() {
        // In this case, the "this" keyword refers to the button that was clicked
        var person = $(this).attr("data-name");

        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=oneTBf80oxo9NHP7zG0HTUxomuvCAts0&limit=10";

        // Performing our AJAX GET request
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        // After the data comes back from the API
        .then(function(response) {
            // Storing an array of results in the results variable
            console.log(response);
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div for the gif
                var gifDiv = $("<div>");

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var personImage = $("<img>");

                // Giving the image tag an src attribute of a property pulled off the
                // result item
                personImage.attr("src", results[i].images.fixed_height_still.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.attr("data-state", "still");
                personImage.addClass("gif");

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(personImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs").prepend(gifDiv);
            }
            }
        });
    });

});





$("#gifs").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    
    if (state === "still") {
        var thisGifsAnimateUrl = $(this).attr("data-animate");
        $(this).attr("src", thisGifsAnimateUrl);
        $(this).attr("data-state", "animate");
        //
        // do what Eric did just above for the Animate data-state but for Still below
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    
  });