///Opening Hand Title Effect

$(document).ready(function() {
 
  
  
  var originalLeftHandr, originalRightHand;

  function animateHandr() {
    originalLeftHandr = parseInt($('#handr').css('left'));
    $('#handr').stop(true, false).animate({ left: originalLeftHandr - 700 }, 450);
  }

  function animateHand() {
    originalRightHand = parseInt($('#hand').css('right'));
    $('#hand').stop(true, false).animate({ right: originalRightHand - 700 }, 450);
  }

  function resetAnimations() {
    $('#handr').stop(true, false).animate({ left: originalLeftHandr }, 450);
    $('#hand').stop(true, false).animate({ right: originalRightHand }, 450);
  }

  $('.centered-content').hover(
  function() {
    animateHandr();
    animateHand();
  },
  function() {
    resetAnimations();
  }
);


  $('#title').hover(function() {
    // When hovered over, change the text color to black
    $(this).css('color', '#202020');
  }, function() {
    // When the mouse leaves, restore the original color (e.g., #EEEDE1)
    $(this).css('color', '#EEEDE1');
  });
});


$(document).ready(function () {
    // Initialize a flag to check if the text has been revealed
    var textRevealed = false;

    $(window).scroll(function () {
      // If the text has been revealed, do nothing
      if (textRevealed) {
        return;
      }

      // Get the current scroll position
      var scrollPosition = $(window).scrollTop();

      // Adjust the value based on the size of your content or viewport
      var threshold = $(document).height() - $(window).height() - 200; // 200 is an example, adjust as needed

      if (scrollPosition > threshold) {
        // Show the hidden h3 elements
        $('h3.hidden-paragraph').css('opacity', '1');
        $('h2.hidden-paragraph').css('opacity', '1');
        $('img.hidden-paragraph').css('opacity', '1');

        // Set the flag to true, indicating that the text has been revealed
        textRevealed = true;
      }
    });
  });

//Scroll button
$(document).ready(function() {
        // Add a click event handler for the #scrollb image
        $('#scrollb').click(function() {
          // Define the target element or position you want to scroll to
          var target = $('.bottom-content'); // Change 'targetElement' to the ID or class of your target

          // Check if the target element exists
          if (target.length) {
            // Calculate the position to scroll to
            var offset = target.offset().top;

            // Animate the scroll with a smooth effect
            $('html, body').animate({ scrollTop: offset }, 1000); // You can adjust the duration (1000ms) as needed
          }
        });
     

 
  $('#otext').hide();
  $('#ctext').hide();
   $('#ftext').hide();
  $('#htext').hide();
  $('#cmptext').hide();

//Toggling for final maze icons
    $('#o').click(function () {
    $('#otext').fadeToggle(); // Use fadeToggle to toggle between fadeIn and fadeOut
  });
  
  
   $('#c').click(function () {
    $('#ctext').fadeToggle(); // Use fadeToggle to toggle between fadeIn and fadeOut
  });
  
   $('#f').click(function () {
    $('#ftext').fadeToggle(); // Use fadeToggle to toggle between fadeIn and fadeOut
  });
  
   $('#h').click(function () {
    $('#htext').fadeToggle(); // Use fadeToggle to toggle between fadeIn and fadeOut
  });
  
   $('#cmp').click(function () {
    $('#cmptext').fadeToggle(); // Use fadeToggle to toggle between fadeIn and fadeOut
  });
  
  
});

