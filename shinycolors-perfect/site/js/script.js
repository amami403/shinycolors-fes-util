//https://maxkss.github.io/shinycolors-helper/version.txt

chrome.storage.local.get(["point", "state"], function(result){
    if(result.point == undefined){
        chrome.storage.local.set({"point": 2})
    }
    if(result.state == undefined){
        chrome.storage.local.set({"state": true})
    }
    chrome.storage.local.get(["state", "point"], function(result){
        if(result.state){
            $(".active-btn").addClass('active')
            if(result.point == 0){ 
                $(".state").text("NORMAL!")
            }
            else if(result.point == 1){ 
                $(".state").text("GOOD!")
            }
            else if(result.point == 2){ 
                $(".state").text("PERFECT!")
            }
        }
        else{
            $(".active-btn").removeClass('active')
            $(".state").text("STOPPED!")
        }
    });
    
});

$(".btn-wrap .btn").on("click", function(e){
    var element = this;
    chrome.storage.local.set({"point": parseInt($(this).attr("value"))})
    chrome.storage.local.get("state", function(result){
        if(result.state){
            $(".state").text($(element).text()+"!")
        }
    });
})

$(".active-btn").on("click", function(e){
    $(".active-btn").toggleClass('active')

    if($(".active-btn").hasClass('active')){
        chrome.storage.local.set({"state": true})
        chrome.storage.local.get("point", function(result){
            if(result.point == 0){ 
                $(".state").text("NORMAL!")
            }
            else if(result.point == 1){ 
                $(".state").text("GOOD!")
            }
            else if(result.point == 2){ 
                $(".state").text("PERFECT!")
            }
        });
    }
    else{
        chrome.storage.local.set({"state": false})
        $(".state").text("STOPPED")
    }
})

$('#update-btn').on("click", function(e){
    $.ajax({
        url: 'https://maxkss.github.io/shinycolors-helper/version.json',
        type: 'get',
        dataType : 'json',
        cache: false,
        success: function (data) {
            var version = parseFloat($('#now-version').text())
            
            if (data.hack == version){
                $('#go-download').text("최신버전 입니다")
                $('#go-download').attr('href', '#')
            }
            else if(data.hack > version){
                $('#go-download').text("최신버전이 있습니다 (클릭 시 이동)")
                $('#go-download').attr('href', 'https://github.com/MaxKss/shinycolors-perfect/releases')
            }
            $('#go-download').show();
        },
    });
})

$("#go-download").on("click", function(e){
    event.preventDefault();
    if($(this).attr('href') != "#"){
        chrome.tabs.create({url: $(this).attr('href')});
    }
})