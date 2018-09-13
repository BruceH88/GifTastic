// define the topic item for the buttons
var topics = ["Bilbo", "Gandalf", "Frodo", "Samwise Gamgee", "Pippin", "Meriadoc"];

// define variables
var inArray = false;

// define DOM variables
var $gifDisplay = $("#gifDisplay");
var $buttonList = $("#buttonList");

// define funstions  ------------------------------------------------------------------------------------
// the function that will display each gif from the array 
function displayResults(results) {
  // clear all the are where the gifs are shown
  $gifDisplay.empty();
  // check if there no results, display no results found and exit
  if (results.length === 0) {
    return false;
  }
  // loop through each gifs returned
  for (var i = 0; i < results.length; i++) {
    // create a new gif div container
    var gifDiv = $("<div>");
    // add the style class to the div
    gifDiv.addClass("float-left");
    // .addClass("gifBox")
    // .addClass("d-inline");
    // create a new gif image DOM object
    var gifImg = $("<img>");
    // assign the src, class, data-state, data-still, and data-animate attributes
    gifImg
      .addClass("gif")
      .attr("data-state", "still")
      .attr("src", results[i].images.fixed_height_still.url)
      .attr("data-still", results[i].images.fixed_height_still.url)
      .attr("data-animate", results[i].images.fixed_height.url);

    //create a p tag to the gif's rating
    var rating = $("<p>");
    rating
      .text("Rated: " + results[i].rating.toUpperCase())
      .addClass("text-center");

    gifDiv
      .append(gifImg)
      .append(rating);
    // append rating and gif div container to the gifDisplay div
    $gifDisplay.append(gifDiv);
  };
};

// add a new button to the list of buttons
function addButton(btnName) {
  // create a new button DOM object
  var newBtn = $("<button>");
  // set the classes of the button (btn, btn-info, m-1)
  newBtn
    .addClass("btn")
    .addClass("btn-info")
    .addClass("m-1")
    .addClass("searchBtn");
  // set the button text value to the value passed in
  newBtn.text(btnName);
  // append the button to the buttonList div
  $buttonList.append(newBtn);
};

// create buttons from the topic array
function createButtonList() {
  $buttonList.empty();
  // for each item in the array
  for (var i = 0; i < topics.length; i++) {
    // call addButton to add the button to the buttonList
    addButton(topics[i]);
  }
};

// checks if a the passed in value is in the array of topics
function isInArray(newTopic) {
  // check if it is an empty string
  if (newTopic.length < 1) {
    // it is empty indicate it already exists in the array
    return true;
  }
  // loop through the array
  for (var i = 0; i < topics.length; i++) {
    if (topics[i].toLowerCase() === newTopic.toLowerCase()) {
      return true;
    }
  }
  return false;
};

// this set the passed string to the set case
function setStringCase(sString) {
  var sOutput = "";
  var bSpace = true;
  for (var i = 0; i < sString.length; i++) {
    if (sString[i] === " ") {
      if (bSpace) {
        // two spaces in a row skip the second one
      } else {
        // found a space set flag
        sOutput += sString[i];
        bSpace = true;
      }
    } else {
      // any other character add to output
      if (bSpace) {
        // just passed a space, make this upper case
        sOutput += sString[i].toUpperCase();
      } else {
        // make this lower case
        sOutput += sString[i].toLowerCase();
      }
      // set space flag to false
      bSpace = false;
    }
  }
  return sOutput;
};

// define events  -----------------------------------------------------------------------------------
// page ready event to load the initial buttons
$(document).ready(function () {
  createButtonList();
});

// topic button click event
$(document.body).on("click", ".searchBtn", function () {
  // get the term to search gifs
  var searchTerm = $(this).text();
  console.log(searchTerm);
  // set the query url
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=WKk0WQCPPReVlutH1pq1ZqfW1XE9DtQK&q=" + searchTerm + "&limit=10";
  //make the ajax call for the queryurl
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);
      // call the function to display all the returned gifs
      displayResults(response.data);
    });
});

// click event to switch between still and animation
$(document.body).on("click", ".gif", function () {
  // get the current state
  var state = $(this).attr("data-state");
  if (state === "still") {
    // if displaying the still image, set the src to the animated gif
    $(this).attr("src", $(this).attr("data-animate"));
    // set the state to animate
    $(this).attr("data-state", "animate");
  } else {
    // otherwise, set the src to the still image
    $(this).attr("src", $(this).attr("data-still"));
    // set the state to still
    $(this).attr("data-state", "still");
  }
});

// click event for the adding to the button list
$("#addButton").on("click", function (event) {
  event.preventDefault();
  // get the search term for the form and set initial letter upper case and the rest lower 
  var newTopic = setStringCase($("#searchTerm").val().trim());
  if (isInArray(newTopic)) {
    $("#searchTerm").val("");
    return false;
  }
  console.log(newTopic);
  // add the name to the topics array
  topics.push(newTopic);
  // re-display the buttonList
  createButtonList();
  $("#searchTerm").val("");
});

// click event to clear the the gifs
$("clearButton").on("click", function () {
  event.preventDefault();
  console.log("clear button clicked")
})