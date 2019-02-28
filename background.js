var perfectState = false;
chrome.storage.local.get("perfectState", function (result) {
    perfectState = result.perfectState
});

var dealMeterState = false;
chrome.storage.local.get("dealMeterState", function (result) {
    dealMeterState = result.dealMeterState
});

var perfectPoint = 'perfect';
chrome.storage.local.get("perfectPoint", function (result) {
    perfectPoint = result.perfectPoint
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if( details.url.includes("shinycolors.enza.fun/0-"))
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
          'perfectState' : perfectState,
          'dealMeterState' : dealMeterState,
          'perfectPoint' : perfectPoint
      })
});

chrome.storage.onChanged.addListener(function(changes, area) {
    if ("perfectState" in changes) {
        perfectState = changes.perfectState.newValue
    }
    if ("dealMeterState" in changes) {
        dealMeterState = changes.dealMeterState.newValue
    }
    if ("perfectPoint" in changes) {
        perfectPoint = changes.perfectPoint.newValue
    }
    chrome.tabs.query({}, function(tabs){
        for(var i = 0; i<tabs.length; i++){
            if(tabs[i].url.includes("shinycolors.enza.fun")){
                chrome.tabs.sendMessage(tabs[i].id, {perfectState: perfectState, dealMeterState : dealMeterState, perfectPoint : perfectPoint}, null);  
            }
        }
    });
});