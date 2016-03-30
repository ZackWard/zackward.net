var quotes = [];
var currentQuote = 0;

var getNewTweetURL = function(number) {
  var shortenedMessage = "Ron Swanson says: " + quotes[number];
  if ( shortenedMessage.length > 140 ) {
    shortenedMessage = shortenedMessage.slice(0, 139) + '\u2026';
  }
  var message = encodeURI(shortenedMessage);
  var tweetIntent = "https://twitter.com/intent/tweet?text=" + message;
  // set the Tweet button to link to the proper URL
  $('#tweetLink').attr('href', tweetIntent);
};

var setNewQuote = function() {
  var newQuoteNumber = Math.floor(Math.random() * (quotes.length));
  if (newQuoteNumber === currentQuote) {
    // If our new quote is the same as our old quote, try again
    setNewQuote();
  } else {
    var newQuote = quotes[newQuoteNumber];
    $('#quoteH1').html(newQuote);
    currentQuote = newQuoteNumber;
    getNewTweetURL(newQuoteNumber);
  }
};

$(document).ready(function() {

  // Set up our button to get a new quote
  // quotes should have been preloaded from remote json file
  $("#newQuote").on('click', function(e) {
    e.preventDefault();
    setNewQuote();
  });

  // Get our quotes via json file on dropbox
  $.getJSON('https://dl.dropboxusercontent.com/u/13022985/ron-swanson-quotes.json', function(json) {
    quotes = json.quotes;
    // Ok, we have our quotes, let's enable our button
    // and set our first quote
    $('#newQuote').prop('disabled', false);
    setNewQuote();
  });
});