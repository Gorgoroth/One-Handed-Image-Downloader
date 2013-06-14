chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.action == 'save-image') {
    var images = $('img');
    if(images.length) {
      images.sort(function(img1,img2){
        return img1.width < img2.width ? 1 : -1;
      });
      window.location = images[0].getAttribute('src');
    }
  }
});
