;(function(){
    //横板导航栏
    $('.header_heng>li').hover(function(){
        $(this).css("background","#7a090b")
    },function(){
        $(this).css("background","#a71b1b")
    });

    //竖版导航栏
    $('.header_shu>ul>li').hover(function(){
        $('.header_shu_all').show();
        $(this).css({
            'background':'rgba(248, 248, 248)','box-shadow':'-1px 1px 3px #666'
            
        })
    },function(){
        $('.header_shu_all').hide()
        $(this).css({
            'background':'#fff','box-shadow':'none',
    })
    })
})();

//广告轮播
(function(){
    $('.main_banner_qiu>span').on('mouseover',function(){
        $(this).addClass('active').siblings('.main_banner_qiu>span').removeClass('active');
        $('.main_banner_img').eq($(this).index()).show().siblings('.main_banner_img').hide();
    })
})();