$(document).ready(function () {
  $("#about a").hover(
    function () {
      $(this).prev().removeClass("fa-circle-o").addClass("fa-dot-circle-o");
    }, 
    function () {
      $(this).prev().removeClass("fa-dot-circle-o").addClass("fa-circle-o");
    });
  $("#sendMessageButton").click(function (event) {
    event.preventDefault();
    alert("I'm sorry, I haven't actually connected this to a mail service yet. Please send me a tweet to remind me to build this! =)");
  });
});