//通用头部 
(function(window){
    //我的邮乐 手机邮乐 帮助中心
    $('.cnn').hover(function(){
        $(this).children('ul').show();
        $(this).css({
            "background":" none #fff",
            "border":" solid 1px #d9d9d9",
        });
        $(this).children('a').css("background","url(../img/header_1407.png)  no-repeat right -18px");
    },function(){
        $(this).children('ul').hide();
        $(this).css({
            "background":" url(../img/header_1407.png) no-repeat -150px 5px #f7f7f7",
            "border":" none",
        });
        $(this).children('a').css("background","url(../img/header_1407.png)  no-repeat right 2px");
    })

    //头部全部商品分类
    $('.line_all').hover(function(){
        $('.header_all').show();
        $(this).css({
            "background":"#fff",
        });
        $(this).children('a').css("background","url(../img/header_1407.png)  no-repeat right -18px");
    },function(){
        $('.header_all').hide();
        $(this).css({
            "background":"#f7f7f7",
        });
        $(this).children('a').css("background","url(../img/header_1407.png)  no-repeat right 2px");
    })
})(window);