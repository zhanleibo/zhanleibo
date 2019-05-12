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


(function(){
    //tab切换
    var dong=function(tap,img,css){
        $(tap).on('mouseover',function(){
            $(this).addClass(css).siblings(tap).removeClass(css);
            $(img).eq($(this).index()).show().siblings(img).hide();
        });
    }
    //广告
    dong('.main_banner_qiu>span','.main_banner_img','active');
    //三个轮播
    dong('.main_firstscreen_sanlun>h4','.main_firstscreen_box>ul','sanlun');
})();

(function(){
    //轮播
    var index = 0;
    //自动播放
    var t =function(){
        setInterval(play, 1000)
    }; 
    t();
    function play() {
        index++;
        if (index > 6) {
            index = 0
        }
        $(".main_banner_qiu span").eq(index).addClass('active').siblings().removeClass('active');

        $(".main_banner_img").eq(index).show().siblings().hide();
    };
})();

//舌尖美食
(function(){
    $.ajax({
        url:'http://10.31.163.88/zhanleibo/php/picdata1.php',
        dataType:'json',
        success:function(data){
            var $str='';
            $.each(data,function(index,value){
                $str+=`
                <li>
                <a href="details.html?pic=${value.num}"><img src="${value.url}"></a>
                <p>${value.title}</p>
                <p>¥ ${value.price}</p>
            </li>`;
            });
            $('.main_box_right>ul').html($str);
        }
    })
})();




//逛一逛
(function(){
    $.ajax({
        url:'http://10.31.163.88/zhanleibo/php/picdata.php',
        dataType: 'json',
        success:function(data){
            var $str='';
            $.each(data,function(index,value){
                $str+=`<li>
                <a class="prod-img" href="details.html?pic=${value.num}">
                    <img src="${value.url}">
                </a>
                <p class="prod-name">
                    <a href="details.html?pic=${value.num}">${value.title}</a>
                </p>
                <p class="prod-price">
                    <span>¥
                        <strong>${value.price}</strong>
                    </span>
                </p>
                <p class="shop_area">
                <a href="details.html?pic=${value.num}">${value.name}</a>
                </p>
            </li>`;
            });
            $('.main_other>ul').html($str);
        },
    });
})();


//楼梯
(function(){
    var $gundongtiao=$('.gundongtiao');
    var $louti=$('.gundongtiao a').not('.returntop');
    var $box=$('#main .main_box');
    $(window).on('scroll',function(){
        //滚动条的距离
        var $top=$(window).scrollTop();
        if($top>=1500){
            $gundongtiao.show();
        }else{
            $gundongtiao.hide();
        };

        //4.拖动滚动条，对应的楼梯添加类名，楼梯到了那块区域。
        //楼层的top值和滚动条距离进行比较
        $box.each(function(index,element){
            $boxTop=$(element).offset().top;
            if($top<$boxTop){
                $louti.removeClass('active');
                $louti.eq(index).addClass('active');
                return false;
            }
        });
    });
    //每一个a对应一个box
    $louti.on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
        $top=$box.eq($(this).index()).offset().top;
        $('html,body').animate({
            scrollTop: $top
        });
    });
    //返回顶部
    $('.returntop').on('click',function(){
        $("html,body").animate({scrollTop:0},1000);
    })
})();


