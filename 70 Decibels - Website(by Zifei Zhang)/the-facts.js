$(document).ready(function () {
  $(".questions").click(function () {
    $(this).toggleClass("active");
  });

  $("#aboutBtn").click(function (e) {
    e.stopPropagation(); // Prevent the click event from reaching the document

    $("#aboutSection").addClass("active");
  });

  $("#closeBtn").click(function (e) {
    e.stopPropagation(); // Prevent the click event from reaching the document

    $("#aboutSection").removeClass("active");
  });
});
