$(document).ready(function () {
  $("#wrongHouse1, #wrongHouse2").click(function (e) {
    e.stopPropagation();

    $("#errorContainer").addClass("active");
  });

  $("#okayBtn").click(function (e) {
    e.stopPropagation();

    $("#errorContainer").removeClass("active");
  });
});
