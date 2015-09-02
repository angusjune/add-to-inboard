var inboardUrlScheme = 'inboard://import?url=';
var imageCxtTtile = chrome.i18n.getMessage('saveImage');
var pageCxtTitle  = chrome.i18n.getMessage('savePage');
var tabTitle;
var tabUrl;

function handleImageUrl(url) {
  var redirectUrl = inboardUrlScheme + url + '&title=' + encodeURI(tabTitle) + '&web_url=' + encodeURI(tabUrl);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    // Open scheme url in current tab
    chrome.tabs.update(tab.id, {url: redirectUrl});
  });
}

chrome.tabs.getSelected(null,function(tab) {
  // Get current tab title
  tabTitle = tab.title;
  tabUrl   = tab.url;
});

// Save image to Inboard
chrome.contextMenus.create({
  'title': imageCxtTtile,
  'contexts':['image'],
  onclick: function(info) {
    handleImageUrl(info.srcUrl);
  }
});

// Save page to Inboard
chrome.contextMenus.create({
  'title': pageCxtTitle,
  'contexts':['page'],
  onclick: function(info, tab) {
    handleImageUrl(tab.url);
  }
});

// Save page to Inboard
chrome.browserAction.onClicked.addListener(function(tab) {
  handleImageUrl(tab.url);
});