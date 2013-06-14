// Funtion returns jquery object with many jquery objects
// Namely, all images fitting our parameters
function get_images() {
  return $('img');
}

// Function takes a jquery object as an argument
// and triggers the file download dialogue
function download_image(requested) {
  var images = get_images();
  var image = images[requested];
  var file_url = image.src;
  var file_name = image.src.substring(image.src.lastIndexOf("/") + 1);

  var link = document.createElement('a');
  link.href = file_url;
  link.target = '_blank';
  link.download = file_name || 'unknown';

  var e = document.createEvent('Event');
  e.initEvent('click', true, true);
  link.dispatchEvent(e);

  (window.URL || window.webkitURL).revokeObjectURL(link.href);
}

// Keypress handler takes event as a parameter
// calculates pressed keys
// and calls download_image
function keypress_handler(e) {
  if((e.which > 48) && (e.which < 58)) {
    // Substract 48 to get number pressed, ie 49-48=1, 57-48=9
    // Substract  1 to get array position, your know, 'cause arrays start at 0
    var requested = e.which - 48 - 1;
    download_image(requested);
  }
  e.preventDefault();
}

// Function adds the keyboard listener
function add_keypress_listener(images) {
  $('body').on('keydown', {arg1: images}, keypress_handler);
}

// Function removes the keyboard listener
// TODO remove on page refresh, too
function remove_keypress_listener() {
  $('body').off('keydown');
}

// Function takes a jquery object with many jquery objects
// Nameley, images
// Adds an overlay to the current page that lists the images
function show_overlay(images) {
  var overlay = $('#image-overlay');

  overlay = jQuery('<div id="image-overlay"></div>');
  overlay.appendTo(document.body);
  overlay = $('#image-overlay');

  overlay.append(
    '<h1>One-Handed Image Downloader</h1>'
    + '<p>Hit A to save all images, 1, 2, 3 etc. to save the numbered images</p>'
    + '<p>Hit Ctrl + Shift + X to close this overlay</p>'
  );

  overlay.append('<ul></ul>');
  var list = $('#image-overlay ul');
  images.each(function(index){
    list.append('<li><img src="' + $(this).attr('src') + '"><span>' + (index+1) + '</span></li>');
  });

  add_keypress_listener();
}

// Function closes the overlay and removes the keypress listener
function close_overlay() {
  $('#image-overlay').remove();
  remove_keypress_listener();
}

// Function
function save_image() {
  // Get all images from page
  var images = get_images();

  if(images.length > 1) {
    // Show overlay for multiple images
    show_overlay(images);
  } else if(images.length == 1) {
    // Download the first image if there's only one
    download_image(0);
  } else {
    // No suitable image found, TODO handle that!
  }
}

// Evaluate messages send from background.js and call the requested functions
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.action) {
    case 'save-image':
      save_image();
      break;
    case 'close-overlay':
      close_overlay();
      break;
  }
});
