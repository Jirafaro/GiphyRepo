// defining starting interest array 
let topics = ['Giraffe','Turtle','Shark','Dog'];
let newdiv; 
// Populate HTML with Buttons for Index of Array 


for (let i = 0; i < topics.length; i++) {
    newdiv = $('<button>');
    newdiv.html(topics[i]);
    $('#buttons').append(newdiv);
    newdiv.attr('data-animal', topics[i]);
}

let state = $(this).attr('data-state');
      if (state==='still') {
        $(this).attr('src', $(this).attr('data-animage')); 
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).attr('data-still;')); 
        $(this).attr('data-state', 'still');
      }

$("button").on("click", function() {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=1Ns9jCPWR84TnAwjwsJhJ82r5DHMS8JC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(animalImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });
// make onclick function for buttons
