// Function to copy code snippet to the clipboard
// Get all code wrappers
const codeWrappers = document.querySelectorAll('.juicer_social_feed-code-wrapper');

// Add event listeners to each copy button
codeWrappers.forEach(wrapper => {
  const copyButton = wrapper.querySelector('.juicer_social_feed-code-copy');
  const tooltip = wrapper.querySelector('.juicer_social_feed-code-copy-tooltip');

  copyButton.addEventListener('click', () => {
    // Create a temporary textarea to hold the code
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = wrapper.querySelector('pre').innerText;
    document.body.appendChild(tempTextarea);

    // Select the text within the textarea
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to clipboard
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(tempTextarea);

    // Show the tooltip
    tooltip.style.display = 'inline-block';

    // Hide the tooltip after 2 seconds
    setTimeout(() => {
      tooltip.style.display = 'none';
    }, 2000);
  });
});


/****** Modal ******/
document.addEventListener("DOMContentLoaded", function() {
  var modal = document.getElementById("juicer_social_feed-modal");
  var btn = document.querySelector(".juicer_social_feed-review-link");
  var closeBtn = document.querySelector(".juicer_social_feed-close");

  if (btn && modal) {
    /* Open modal */
    btn.addEventListener("click", function() {
      modal.style.display = "block";
    });
  }

  if (closeBtn && modal) {
    /* Close modal */
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }
});

// Dismiss review notice
jQuery(document).ready(function($) {
  if (typeof juicer_social_feed_admin !== 'undefined') {
      // Handle "Maybe later" button click
      $('#juicer_social_feed-maybe-later').on('click', function() {
          $.post(juicer_social_feed_admin.ajax_url, {
              action: 'juicer_social_feed_dismiss_review_notice',
              security: juicer_social_feed_admin.security,
              dismiss_type: 'temporary'
          }, function(response) {
              console.log('Temporary dismissal response:', response);
              if (response.success) {
                  $('#juicer_social_feed-review-notice').hide();
              } else {
                  console.error('Temporary dismissal failed:', response.data);
              }
          }).fail(function(xhr, status, error) {
              console.error('Temporary dismissal AJAX request failed:', status, error);
          });
      });

      // Handle "Never show this again" button click
      $('#juicer_social_feed-never-show').on('click', function() {
          $.post(juicer_social_feed_admin.ajax_url, {
              action: 'juicer_social_feed_dismiss_review_notice',
              security: juicer_social_feed_admin.security,
              dismiss_type: 'permanent'
          }, function(response) {
              console.log('Permanent dismissal response:', response);
              if (response.success) {
                  $('#juicer_social_feed-review-notice').hide();
              } else {
                  console.error('Permanent dismissal failed:', response.data);
              }
          }).fail(function(xhr, status, error) {
              console.error('Permanent dismissal AJAX request failed:', status, error);
          });
      });
  } else {
      console.error('juicer_social_feed_admin is not defined.');
  }
});






