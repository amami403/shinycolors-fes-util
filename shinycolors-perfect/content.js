$(document).ready(function(){
    chrome.runtime.sendMessage({}, function(response) {
        if(response.success){
            var point = document.createElement("p")
            $(point).attr("id", "selectPointElement").text(response.point).hide().appendTo($("body"))

            var state = document.createElement("p")
            $(state).attr("id", "hackState").text(response.state).hide().appendTo($("body"))
        }
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        $("#selectPointElement").text(request.point)
        $("#hackState").text(request.state)
});