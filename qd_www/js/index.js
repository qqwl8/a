

var _userAgent = navigator.userAgent.toString().toLowerCase();



var reg_mk = 0,
    music_mk = 1,
    jump_mk = 1,
    nowIndex = 0,
    p2_img_index = 2,
    p2_scroll_mk = 0,
    tag_time = new Date("2017/08/31 00:00").getTime(),
    tag_time2 = new Date("2017/08/21 14:00").getTime(),
    now_time = new Date().getTime();



var $img_out = $(".img-out");

function initSet() {
    $(".flash-block").css({ "top": "0px", "left": ($(window).width() - 1920) / 2 + "px" });
    $(".scroll-div").css({ "top": ($(window).height() - $(".scroll-div").height()) / 3 * 2 + 60 + "px", "left": -1 * ($(".page-2").width() / 3 * (p2_img_index - 1) + ($(".page-2").width() - 1200) / 2) + "px" });
    $(".img-out").css({ "width": $(".page-2").width() / 3 + "px" });
    $img_out.removeClass("on near").eq(p2_img_index).addClass("on").prev().addClass("near").next().next().addClass("near");
    if ($(window).height() >= 1014) {
        $(".p0-transition-out").attr("style", "");
        $(".flash-block").css({ "top": "0px", "left": ($(window).width() - 1920) / 2 + "px" });
        $(".p0-div-0").css("top", "815px");
    } else {
        $(".flash-block").css({ "top": "-66px", "left": ($(window).width() - 1920) / 2 + "px" });
        $(".p0-div-0").css("top", "749px");
        var _scale_0 = $(window).height() / 1014;
        if (($(window).width() / $(window).height()) < (1920 / 1014)) {
            _scale_0 = $(window).height() / 1014;

        } else {
            _scale_0 = $(window).width() / 1920;
        }
        $(".p0-transition-out").attr("style", "transform: scale(" + _scale_0 + ");-webkit-transform: scale(" + _scale_0 + ");-moz-transform: scale(" + _scale_0 + ");");
    }

}


initSet();

$(window).resize(function() {
    initSet();
    jump_mk = 1;
    setTimeout(function() {
        $(".out-div").stop().animate({ "scrollTop": nowIndex * $(".out-div").height() }, 50, function() {
            jump_mk = 0;

        });
    }, 200);

});


//第三屏翻页

var $scroll_div = $(".scroll-div"),
    p2ScrollTimer = "";

function p2Scroll(str) {

    clearTimeout(p2ScrollTimer);
    if (p2_scroll_mk == 1) {
        return false;
    }
    if (str == "l") {
        p2_img_index--


    } else if (str == "r") {
        p2_img_index++

    } else if (str != "r" && str != "l") {
        p2_img_index = str;
    } else {
        alert("error");
    }
    $img_out.removeClass("on near near-left near-right");
    p2_scroll_mk = 1;
    $scroll_div.animate({ "left": -1 * ($(".page-2").width() / 3 * (p2_img_index - 1) + ($(".page-2").width() - 1200) / 2) + "px" }, 1000, function() {

        $(".scroll-div").addClass("notransition");
        if (str == "l") {
            if (p2_img_index <= 1) {
                p2_img_index = $img_out.length - 3;

                $scroll_div.css({ "left": -1 * ($(".page-2").width() / 3 * (p2_img_index - 1) + ($(".page-2").width() - 1200) / 2) + "px" });

            }
        } else if (str == "r") {
            if (p2_img_index >= ($img_out.length - 2)) {
                p2_img_index = 2;
                $scroll_div.css({ "left": -1 * ($(".page-2").width() / 3 * 1 + ($(".page-2").width() - 1200) / 2) + "px" });

            }
        } else {


        }

        $(".scroll-div").removeClass("notransition");




        p2_scroll_mk = 0;
        $img_out.eq(p2_img_index).addClass("on").prev().addClass("near near-left").next().next().addClass("near near-right");
        p2ScrollTimer = setTimeout(function() {
            p2Scroll("r")
        }, 8000);

    });
}

p2Scroll("r");


$(".scroll-btn-right").on("click", function() {
    p2Scroll("r");
})

$(".scroll-btn-left").on("click", function() {
    p2Scroll("l");
})


$(".img-out").on("click", function() {
    if ($(this).hasClass("on")) {
        return false;
    }

    if ($(this).hasClass("near-left")) {
        p2Scroll("l");
    } else if ($(this).hasClass("near-right")) {
        p2Scroll("r");
    }


})
