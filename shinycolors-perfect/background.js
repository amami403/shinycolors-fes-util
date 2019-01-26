var point = 0;
chrome.storage.local.get("point", function (result) {
    point = result.point
});

var state = true;
chrome.storage.local.get("state", function (result) {
    state = result.state
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if( details.url.includes("shinycolors.enza.fun/fesConcert"))
            return {redirectUrl: "https://maxkss.github.io/shinycolors-helper/fesConcert.js" };
    },
    {
        urls: ["*://shinycolors.enza.fun/*.js"]
    },
    ["blocking"]
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      sendResponse ({
          'success' : true,
          'state' : state,
          'point' : point
      })
});

chrome.storage.onChanged.addListener(function(changes, area) {
    if ("point" in changes) {
        point = changes.point.newValue
    }
    if ("state" in changes) {
        state = changes.state.newValue
    }
    chrome.tabs.query({}, function(tabs){
        for(var i = 0; i<tabs.length; i++){
            console.log(tabs[i].url.includes("shinycolors.enza.fun"))
            if(tabs[i].url.includes("shinycolors.enza.fun")){
                chrome.tabs.sendMessage(tabs[i].id, {point: point, state : state}, null);  
            }
        }
    });
});