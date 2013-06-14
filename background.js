// Handles requests sent by the content script.
//
chrome.runtime.onInstalled.addListener(function() {
});

chrome.browserAction.onClicked.addListener(function() {
  alert('Yay, a click');
});


chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {action: "save-image"});
  });
});
