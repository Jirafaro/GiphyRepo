// defining starting interest array 
let topics = ['Giraffe','Turtle','Shark','Dog'];
let newdiv; 
// Populate HTML with starter array  buttons

function add(){
  $('#buttons').empty();
for (let i = 0; i < topics.length; i++) {
    newdiv = $('<button>');
    newdiv.html(topics[i]);
    $('#buttons').append(newdiv);
    newdiv.attr('data-selector', topics[i]);
}}
add();

// add new button (search item)
$('#search-button').on("click", function(e){
  e.preventDefault(); // look this up later 
  let newbutton = $('#search-term').val().trim();
  topics.push(newbutton);
  add();
  $('#search-term').val(""); // Clear search box after search
})

// get gifs 

$("#buttons").on("click", "button", function() { // action location what 
    var selector = $(this).attr("data-selector");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      selector + "&api_key=1Ns9jCPWR84TnAwjwsJhJ82r5DHMS8JC";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        $('#gifs-appear-here').empty(); // empty previous gifs 
        console.log(results);
        for (var i = 0; i < 10; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var selectorImage = $("<img>");
          selectorImage.attr({
            "src": results[i].images.original.url,
            "data-still": results[i].images.fixed_height_still.url,
            "data-animate": results[i].images.original.url,
            "data-state": "animate",
            "class": "gif"
          });

          gifDiv.prepend(p);
          gifDiv.prepend(selectorImage);
          
          $("#gifs-appear-here").prepend(gifDiv);
        }

          // pausing gifs by changing the data state of the gif
      $(".gif").on("click", function(){
        var state = $(this).attr("data-state");
        if (state==="animate") {
          var newstate = $(this).attr("data-still");
          $(this).attr("src", newstate);
          $(this).attr("data-state", "still");
        } else {
          var newstate = $(this).attr("data-animate");
          $(this).attr("src", newstate);
          $(this).attr("data-state", "animate");
        }
      })
      });
    
  });

