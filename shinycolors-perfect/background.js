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