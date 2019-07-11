$(document).ready(function () {

    var topics = ["The Matrix", "The Shawsank Redemption", "Die Hard", "Star Trek", "Star Wars"];

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

});