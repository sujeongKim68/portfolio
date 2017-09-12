$(document).ready(function() {

    /**
     *  UI 스크립트 init
     */

    portfolio.init();


    /**
     * $ 확장형 스크립트
     */

    myLib.init();


    /**
     * 라이브러리 스크립트.
     */

    lib.init();


});


var portfolio = {
    init : function () {
        portfolio.getScroll(100, "html", "getScroll");
        portfolio.getScroll(800, ".btn-goTop", "active");
        portfolio.showPortfolio();
        portfolio.bgParallax();
        portfolio.currentNav();
        portfolio.backTop();
        portfolio.spyTarget();
        portfolio.countUp();
        portfolio.scrollPf();
        portfolio.mobileNav();
    },

    //getScroll
    getScroll : function (point, el, className) {
        $(window).scroll(function () {
            var sct = $(window).scrollTop();
            if( sct > point ) {
                $(el).addClass(className);
            } else{
                $(el).removeClass(className);
            }
        });
    },

    //showPortfolio
    showPortfolio : function () {
        $(window).scroll(function () {
            var sct = $(window).scrollTop(),
                pfItem = $("section.portfolio .work");

            pfItem.each(function (i) {
                var self = $(this);
                var pfItemOft = self.offset().top;
                if ( sct > pfItemOft - 400 ) {
                    self.addClass("fadeInUp-1");
                }
            });
        });
    },

    //bg parallax
    bgParallax : function () {
     $(window).on("scroll", function () {
         var selector = $("section.banner-blog");
         var bg = selector.find(".bg");

         var sct = $(window).scrollTop();
         var point = selector.offset().top - 700;

         if ( sct > point ){
             var yPos = -(sct * bg.data("speed") / 1800);
             bg.css({
                 "transform" : "translate(0px, " + yPos + "%)"
             });
         }
     });
    },

    // 현재 메뉴 활성화(.active)
    currentNav : function () {
        $(window).on("scroll", function () {
            $("section").each(function () {
                var self = $(this),
                    winSct = $(window).scrollTop(),
                    secOft = self.offset().top,
                    checkCurrent = secOft - winSct;

                if ( checkCurrent < 300 ) {
                    var selfNav = self.data("cate"),
                        menu = $("header nav ul li");

                    menu.removeClass("active");
                    $(selfNav).addClass("active");

                    // 이 명령에 필요한 애는 아니고 나중에 쓰일 수 있는 명령
                    $("section").removeClass("current");
                    self.addClass("current");
                }
            });
        });
    },

    // top으로 돌아가는 모션
    backTop : function () {
        var top = $(".btn-goTop");
        top.on("click", function () {
            var speed = 400,
                easing = 'easeInOutExpo';
           $("html, body").stop().animate({scrollTop:0}, speed, easing);
        });
    },

    //nav click scroll 이동
    spyTarget : function () {
        var $menu = $("header .gnb li.nav-item");
        $menu.on("click", function () {
            var self = $(this);
            var spyTarget = self.data('spy');
            portfolio.moveScroll(spyTarget, -55);
        });
    },

    // spyTarget에서 이용, moveScroll to Target
    moveScroll : function (tg, flex) {
        var tgOft = $(tg).offset().top,
            speed = 1000,
            easing = "easeInOutExpo";
        $('html,body').stop().animate({scrollTop : tgOft + flex}, speed, easing);
    },

    // countUp
    countUp : function () {
        $(window).on("scroll", function () {
            var winSct = $(window).scrollTop(),
                point = $("section.my-skills"),
                pointOft = point.offset().top - 300;
            if ( winSct > pointOft) {
                if ( !point.is('.countUpEnd')) {
                    $(".countUp").each(function () {
                        var self = $(this),
                            countData = self.data("count");
                        $({ countNum : 0 }).animate({
                                countNum : countData
                            },
                            {
                                duration : 800,
                                step : function (now) {
                                    self.html(Math.floor(now) + "%");
                                }
                            });
                    });
                    point.addClass("countUpEnd");
                }
            }
        });
    },

    // 포트폴리오 사진 슬라이드
    scrollPf : function () {
        var pfThumb = $("section.portfolio .content-area .thumb");

        pfThumb.hover(function () {
            $(this).addClass("on");
        }, function () {
            $(this).removeClass("on");
        });
    },

    //mobile헤더 네비게이션
    mobileNav : function () {
        $('header .btn-sitemap').click(function () {
            $('body').toggleClass('mobile-nav');
        });
    }
};

var myLib = {
    init : function () {
        myLib.extend();

        // $("#preloader").preloader();
        $('.scr').goDownSection();
    },
    extend : function () {
        $.fn.extend({
            preloader :  function(){
                self = $(this);
                self.delay(600).fadeOut(1500);
            },
            goDownSection: function () {
                return $(this).on('click',function(e){
                    e.preventDefault();
                    var toff = $(this).closest('section').next('section').offset().top;
                    var headerHeight = $("#header").height();
                    console.log(toff, headerHeight, toff - headerHeight);
                    $('html,body').stop().animate({scrollTop:toff - (headerHeight - 8)}, 1000, 'easeInOutExpo')
                });
            },
        });
    }

};



var lib = {
    init : function () {
        lib.slider.init();
        lib.designSelect();
    },

    // 사이트 슬라이드
    slider : {
        init : function () {
            lib.slider.visualSlider();
        },
        visualSlider : function () {


        }
    },

    // 말줄임표
    dotdotdot : function () {
        $('.dotdotdot').dotdotdot();
    },




    // 디자인 셀렉트박스

    designSelect : function () {
        $('.design-select').each(function(){

            if ( $(this).parent('.designSelectW').find('.select-content').length > 0 ) return;

            /*reset*/
            var _that = $(this);
            var _thatTitle = _that.attr('title');
            $(this).hide();
            $(this).wrap('<div class="designSelectW" />');
            var selectW = $(this).parent('.designSelectW');
            selectW.append('<div class="select-content" />');
            var selectC = selectW.find('.select-content');
            selectC.append('<div class="select-title"><a href="#"></a></div>');
            selectC.append('<ul class="select-list" />');
            var selectT = selectW.find('.select-title > a');
            if (_thatTitle){
                selectT.attr('title',_thatTitle);
            }
            var selectL = selectW.find('.select-list');
            if ($(this).find(' option:selected')){
                selectT.text($(this).find('option:selected').text());
            }else{
                selectT.text($(this).find('option').eq(0).text());
            }
            var selectOption = $(this).find('option');
            selectOption.each(function(){
                var optionText = $(this).text();
                selectL.append('<li><a href="#">' + optionText + '</a></li>')
            });
            selectL.find('li').eq(0).addClass('first');
            selectL.find('li').last().addClass('last');
            selectL.hide();

            /*event handler*/
            selectT.on('click',function(e){
                e.preventDefault();
                e.stopPropagation();
                var selectBox = $(this).parent().parent().parent().parent('.design-select-box');
                if ($(this).parent().next().is(':visible')){
                    $(this).parent().next().hide();
                    selectBox.css('z-index',5);
                }else{
                    $('.select-list').hide();
                    $(this).parent().next().show();
                    $('.design-select-box').css('z-index',5);
                    selectBox.css('z-index',10);
                }
                $(window).click(function(){
                    selectL.hide();
                    $(window).unbind('click');
                    selectBox.css('z-index',5);
                })
            });
            selectT.on('keydown',function(e){
                if (e.keyCode == 9 && $(this).next().parent().is(':visible')){
                    $(this).parent().next().find('a').eq(0).focus();
                    return false;
                }else if (e.keyCode == 27){
                    $(this).parent().next().hide();
                    $(this).focus();
                }else{
                    return true;
                }
            });
            selectW.find('.select-list a').on('click',function(e){
                e.preventDefault();
                var $text = $(this).text();
                var $index =$(this).parent().parent().find('li').index($(this).parent());
                _that.find('option').removeAttr('selected');
                _that.find('option').eq($index).prop('selected','selected');
                $(this).parent().parent().parent().find('.select-title').find('a').text($text).focus();
                $(this).parent().parent().hide();
                $(this).parent().parent().parent().parent().parent().next().addClass('on');
                if (_that.attr('onchange')){
                    _that.trigger('onchange');
                }else{
                    _that.trigger('change');
                }
            });
            $('.select-list').find('a').on('keydown',function(e){
                if (e.shiftKey && e.keyCode == 9) {
                    if ($(this).parent().attr('class') == 'first'){
                        $(this).parent().parent().find('li').last().find('a').focus();
                        return false;
                    }
                }else if (e.keyCode == 9){
                    if ($(this).parent().attr('class') == 'last'){
                        //$(this).parent().parent().find('li').eq(0).find('a').focus();
                        $(this).parent().parent().hide();
                        $(this).parent().parent().prev().find('a').focus();
                        return false;
                    }
                }else if (e.keyCode == 27){
                    $(this).parent().parent().hide();
                    $(this).parent().parent().parent().find('.select-title').find('a').focus();
                    return false;
                }else{
                    return true;
                }
            });

        });
    }

};




