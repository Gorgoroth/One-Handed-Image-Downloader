chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.action == 'save-image') {
    // Get all images from page and sort by size
    var images = $('img');
    if(images.length) {
      images.sort(function(img1,img2){
        return img1.width < img2.width ? 1 : -1;
      });

      // Download the biggest image
      var file_url = images[0].src;
      var file_name = images[0].src.substring(images[0].src.lastIndexOf("/") + 1);

      var link = document.createElement('a');
      link.href = file_url;
      link.target = '_blank';
      link.download = file_name || 'unknown';

      var e = document.createEvent('Event');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);

      (window.URL || window.webkitURL).revokeObjectURL(link.href);
    }
  }
});
