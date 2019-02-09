var dealMeter = document.createElement('script');
dealMeter.src = chrome.extension.getURL('dealMeter.js');
dealMeter.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(dealMeter);

$(document).ready(function(){
    chrome.runtime.sendMessage({}, function(response) {
        if(response.success){
            var perfectPoint = document.createElement("p")
            $(perfectPoint).attr("id", "perfectPoint").text(response.perfectPoint).hide().appendTo($("body"))

            var perfectState = document.createElement("p")
            $(perfectState).attr("id", "perfectState").text(response.perfectState).hide().appendTo($("body"))

            var dealMeterState = document.createElement("p")
            $(dealMeterState).attr("id", "dealMeterState").text(response.dealMeterState).hide().appendTo($("body"))
        }
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        $("#perfectPoint").text(request.perfectPoint)
        $("#perfectState").text(request.perfectState)
        $("#dealMeterState").text(request.dealMeterState)
});