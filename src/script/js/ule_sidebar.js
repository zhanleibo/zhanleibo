(function(){
    $('.appear').hover(function(){
        $(this).children('.flow_box').animate({
            right:'40px',
        })
    },function(){
        $(this).children('.flow_box').stop(true).animate({
            right:'-100px',
        })
    });

    $(window).on('scroll',function(){
        //滚动条的距离
        var $top=$(window).scrollTop();
        if($top>=500){
            $('.sidebat_bottom_return').show();
        }else{
            $('.sidebat_bottom_return').hide();
        };
    });
    //回到顶部
    $('.sidebat_bottom_return').on('click',function(){
        $("html,body").animate({scrollTop:0},1000);
    })
})();