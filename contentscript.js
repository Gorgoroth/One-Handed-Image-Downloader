// Function takes a jquery object as an argument
// and triggers the file download dialogue
function download_image(image) {
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

// Function takes a jquery object with many jquery objects
// opens an overlay to the current page
function show_overlay(images) {
  var overlay = $('#image-overlay');

  if(overlay.length) {
    // If we have just hidden the overly, simply make visible again
    overlay.show();
  } else {
    overlay = jQuery('<div id="image-overlay"></div>');
    overlay.appendTo(document.body);
    overlay = $('#image-overlay');
    overlay.append('<ul></ul>');
    var list = $('#image-overlay ul');

    list.append('<li><img src="http://placehold.it/300x300&text=Download+All"></li>');
    images.each(function(){
      list.append('<li><img src="' + $(this).attr('src') + '"></li>');
    });
  }
}

function save_image() {
  // Get all images from page
  var images = $('img');
    if(images.length > 1) {
      // If there is more than one image, sort by size and let user choose
      images.sort(function(img1,img2){
        return img1.width < img2.width ? 1 : -1;
      });
      show_overlay(images);
    } else if(images.length == 1) {
      // Download the biggest image if there's only one
      download_image(images[0]);
    } else {
      // No suitable image found, TODO handle that!
    }
}

function close_overlay() {
  $('#image-overlay').hide();
}

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
