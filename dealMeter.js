function DealMeter(){
    this.judge = {}
    this.player = {}

    var dmHtml = `<div id="dm-wrap">
                    <div id="dm-wrap-wrap">
                        <div id="dm-btn"></div>
                        <div id="dm-popup">
                            <div class="list">
                                <ul>
                                    
                                </ul>
                            </div>
                            <div class="ok-wrap">
                                <div id="ok-btn">
                                    <img src="https://raw.githubusercontent.com/MaxKss/shinycolors-helper/master/ok.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    
    $("body").append(dmHtml)

    $(document).on('DOMNodeInserted','canvas',function() {
        $("#dm-wrap").width($("canvas").width());
        $("#dm-wrap").height($("canvas").height());
        $("#dm-btn").height ($("#dm-btn").width()); 
      });

    $(window).bind('resizeEnd', function() {
        $("#dm-wrap").width($("canvas").width());
        $("#dm-wrap").height($("canvas").height());
        $("#dm-btn").height ($("#dm-btn").width()) 
    });
}

DealMeter.prototype.showDealMeter = function() {
    $("#dm-wrap").show()
    $("#dm-btn").fadeIn()
};

DealMeter.prototype.hideDealMeter = function() {
    $("#dm-popup").hide();
    $("#dm-wrap").hide()
};

DealMeter.prototype.initJudgeList = function(e) {
    this.judge = {}
    for(var i = 0; i < e.length; i++){
            this.judge[e[i].id] = e[0].attribute
    }
};

DealMeter.prototype.initPlayerList = function(e) {
    this.player = {}
    var judge = Object.keys(this.judge) //[226, 227, 228]

    for(var i = 0; i < e.length; i++){
        var player = {}

        if(e[i].isPlayer == false || e[i].isPlayer == undefined){
            player["name"] = e[i].name

            for(var j = 0; j < judge.length; j++){
                player[judge[j]] = 0
            }

            this.player[e[i].id] = player
        }
        else{
            player["name"] = e[i].name

            for(var j = 0; j < judge.length; j++){
                player[judge[j]] = 0
            }

            this.player["player"] = player
        }
    }
    this.renderList()
};

DealMeter.prototype.calcDealMeter = function(e) {
    var actions = e.actions

    actions.forEach(i => {
        if(i.role == "rival" || i.role == "idol"){
            i.targets.forEach(t => {
                if(t.role == "judge" && t.id in this.judge){
                    t.effects.forEach(d => {
                        if(d.type.includes("damage")){
                            if(i.role == "rival"){
                                this.player[i.id][t.id] += d.value
                            }
                            else if(i.role == "idol"){
                                this.player["player"][t.id] += d.value
                            }
                        }
                    })
                }
            });
        }
    }) 
    this.renderList()
};

DealMeter.prototype.renderList = function(){
    $("#dm-popup ul").empty()
    var judge = Object.keys(this.judge).sort()
    var player = Object.keys(this.player).sort()
    player.forEach(p => {
        $("#dm-popup ul").append(`<li>
                                    <div class="player-wrap">
                                        <div class="nickname">${this.player[p]['name']}</div>
                                        <div class="attr">
                                            <div class="vo">
                                                <img src="https://raw.githubusercontent.com/MaxKss/shinycolors-helper/master/vo.png"
                                                    alt="">
                                                <p class="vo-text attr-text">${this.player[p][judge[0]]}</p>
                                            </div>
                                            <div class="da">
                                                <img src="https://raw.githubusercontent.com/MaxKss/shinycolors-helper/master/da.png"
                                                    alt="">
                                                <p class="da-text attr-text">${this.player[p][judge[1]]}</p>
                                            </div>
                                            <div class="vi">
                                                <img src="https://raw.githubusercontent.com/MaxKss/shinycolors-helper/master/vi.png"
                                                    alt="">
                                                <p class="vi-text attr-text">${this.player[p][judge[2]]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>`)
    });
}

var dealMeter = new DealMeter() // 딜미터기 선언

$("#dm-btn").click(function(){
    $("#dm-popup").css("display", "flex").hide().show();
})

$("#ok-btn").click(function(){
    $("#dm-popup").fadeOut();
})

$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 500);
});

function resizeDM(){
    var windowWidth = $(window).innerWidth(), windowHeight = $(window).innerHeight();

    if(windowWidth <= windowHeight){
        $("#dm-wrap").width($(window).innerWidth());
        $("#dm-wrap").height($(window).innerWidth()*(9/16));
    }
    else{
        $("#dm-wrap").height($(window).innerHeight());
        $("#dm-wrap").width($(window).innerHeight()*(16/9));
    }
    $("#dm-btn").height ($("#dm-btn").width()) 
}
