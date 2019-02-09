//https://maxkss.github.io/shinycolors-helper/version.txt

chrome.storage.local.get(["perfectState", "dealMeterState", "perfectPoint"], function(result){
    if(result.perfectState == undefined || result.dealMeterState == undefined || result.perfectPoint == undefined){
        if(result.perfectState == undefined){
            chrome.storage.local.set({"perfectState": false})
        }
        if(result.dealMeterState == undefined){
            chrome.storage.local.set({"dealMeterState": false})
        }
        if(result.perfectPoint == undefined){
            chrome.storage.local.set({"perfectPoint": 2})
            $(".btn-wrap .btn.perfect").addClass('active')
        }
        return
    }
    else{
        if(result.perfectState){
            $("#perfect > .active-btn").addClass('active')
        }
        if(result.dealMeterState){
            $("#deal-meter > .active-btn").addClass('active')
        }
        $(".btn-wrap .btn[value='"+result.perfectPoint+"']").addClass('active')
    }
    
});

$(".active-btn").on("click", function(e){
    event.preventDefault();
    $(this).toggleClass('active')
    var target = $(this).attr("target")
    
    if($(this).hasClass('active')){
        chrome.storage.local.set({[target]: true})
        return
    }
    chrome.storage.local.set({[target]: false})
})

$(".perfect-options .btn-wrap .btn").on("click", function(e){
    event.preventDefault();
    $(".perfect-options .btn-wrap .btn").removeClass('active')
    chrome.storage.local.set({"perfectPoint": parseInt($(this).attr("value"))})
    $(this).addClass('active')
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