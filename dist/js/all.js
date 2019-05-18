(function ($) {
    function goodslist(id, count) {
        $.ajax({
            url: 'http://10.31.163.88/zhanleibo/php/picdata.php', //获取所有的接口数据
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, value) {
                    if (id == value.num) {
                        var $liattr = value.urllist.split(',');
                        var cookienum = $.cookie('cookienum');
                        var totalprice = cookienum * value.price;
                        var $str = `<div class="cart_store">
                        <div class="shop_name">
                            <ul>
                                <li class="cart-check">
                                    <input type="checkbox" class="chk-all">
                                </li>
                                <li class="cart-name">
                                    <a href="#">${value.name}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="cart_items">
                            <ul>
                                <li class="cart-check">
                                    <input type="checkbox" class="chk-all">
                                </li>
                                <li class="cart-name">
                                    <a href="#" class="shop_img">
                                        <img
                                            src="${$liattr[0]}">
                                    </a>
                                    <a href="#" class="shop_icons"> ${value.title}</a>
                                    <i></i>
                                    <div class="cart_attr">
                                        <p>颜色： 西瓜红</p>
                                        <p>规格： 不适用</p>
                                    </div>
                                </li>
                                <li class="cart-price"><span>￥${value.price}</span></li>
                                <li class="cart-num">
                                    <span class="jian"></span>
                                    <input type="text" class="textField pCount" name="pCount" id="pCount" value="${$.cookie('cookienum')}">
                                    <span class="jia"></span>
                                </li>
                                <li class="cart-total">${totalprice}</li>
                                <li class="cart-action">
                                    <a href="#">收藏</a>
                                    <a href="#" class="del">删除</a>
                                </li>
                            </ul>
                        </div>
                    </div>`;
                        $('.cart_main').html($str);
                        var $strr = `<div class="cart_total">
                    <dl class="prod-count">
                        <dt>商品数量：</dt>
                        <dd><strong>${$.cookie('cookienum')}</strong>件</dd>
                    </dl>
                    <dl class="prod-price">
                        <dt>价格合计：</dt>
                        <dd><strong>¥<em>${totalprice}</em></strong></dd>
                    </dl>
                    <dl class="prod-discount">
                        <dt>促销抵扣</dt>
                        <dd>- <strong>¥<em>0.00</em></strong></dd>
                    </dl>
                    <dl class="prod-totalprice">
                        <dt>商品总价：<br><span>不含运费</span></dt>
                        <dd>¥<em>${totalprice}</em></dd>
                    </dl>
                    <p class="fr">
                        <a href="http://10.31.163.88/zhanleibo/src/html/" class="btn_continue">继续购物</a>
                        <a href="#" class="btn_ordernow">去结账</a>
                    </p>
                </div>
                    `;
                        $('.cart_settle').html($strr);
                        //删除商品
                        $('.del').on('click', function () {
                            $('.zezhaoceng').show();
                            $('.btn-action em').on('click', function () {
                                $('.zezhaoceng').hide();
                                $.cookie('cookiesid', 'cookienum', {
                                    expires: -1
                                });
                            });
                        });
                        $('.btn-clear').on('click', function () {
                            $('.zezhaoceng').show();
                            $('.btn-action em').on('click', function () {
                                $('.zezhaoceng').hide();
                                $.cookie('cookiesid', 'cookienum', {
                                    expires: -1
                                });
                            });
                        });
                        //数量增加和减少
                        //数量增加
                        var num = $('.textField');
                        $('.jia').on('click', function () {
                            cookienum++
                        });
                        $('.jian').on('click', function () {
                            num.val(parseInt(num.val()) - 1);
                        });
                    }
                })
            },
        })
    }
    //2.获取cookie，执行渲染列表的函数
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        var s = $.cookie('cookiesid').split(','); //数组sid
        var n = $.cookie('cookienum').split(','); //数组num
        $.each(s, function (i, value) {
            goodslist(s[i], n[i]);
        });
    }
})(jQuery)
(function ($) {
    var xian = function (zhu, fu) {
        $(zhu).hover(function () {
            $(fu).show()
        }, function () {
            $(fu).hide()
        });
    }
    xian('.storeheader_grade', '.storeheader_count');
    xian('.storeheader_shouchang', '.storeheader_QR');

    var $pic = location.search.toString(1).split('=')[1];
    $.ajax({
        url: 'http://10.31.163.88/zhanleibo/php/details.php',
        data: {
            sid: $pic
        },
        dataType: 'json',
        success: function (data) {
            var $liattr = data.urllist.split(',');
            var $listr = '';
            $.each($liattr, function (index, value) {
                $listr += '<li><img src="' + value + '"></li>';
            });
            $str = `
        <div class="left">
        <div class="scale">
        <div class="smallpic">
            <img src="${$liattr[0]}" pic="${data.num}">
            <div class="smallfang"></div>
        </div>
        <div class="bigfang">
            <img src="${$liattr[0]}" class="bigpic">
        </div>
        </div>
        <div class="carousel">
            <ul class="carousel_ul">
               ${$listr}
            </ul>
        </div>
        </div>
        <div class="right">
            <h1>${data.title}</h1>
            <div class="money">商品号 <i>344305407</i></div>
            <div class="money">价格<span>￥${data.price}</span></div>
            <div class="money">服务 <i>本商品由${data.name}提供
                并进行相关配送和售后等服务。</i>
            </div>
            <dl class="money">
						<dt>数量</dt>
						<dd>
                            <span class="jian">-</span>
							<input type="text" class="textField pCount" name="pCount" id="pCount" value="1">
                            <span class="jia">+</span>
                            <span class="kucun">(库存8817件)</span> 
						<p class="limit_msg"></p></dd>
					</dl>
            <div class="getsth">
                <button class="buy">立即购买</button>
                <a class="shoppingcart" href="http://10.31.163.88/zhanleibo/src/html/cart.html">加入购物车</a>
            </div>
        </div>`;
            $('#mian').html($str);

            $name = `<a href="#" class="storeheader_name">${data.name}</a>
        <span class="storeheader_star"><i></i><em>5</em></span>
        <div class="storeheader_count">
                    <div class="store_good">
                        <h4>
                            店铺总评分
                            <span>5</span>
                        </h4>
                        <dl class="storeDescription">
                            <dt>描述相符</dt>
                            <dd>5</dd>
                        </dl>
                        <dl class="storeDescription">
                            <dt>服务态度</dt>
                            <dd>5</dd>
                        </dl>
                        <dl class="storeDescription">
                            <dt>发货速度</dt>
                            <dd>5</dd>
                        </dl>
                    </div>
                    <div class="storeView">
                        <a href="#">浏览店铺</a>
                        <span>收藏店铺</span>
                    </div>
                </div>`
            $('.storeheader_grade').html($name);
            // //小放/小图=大放/大图     小放/大放=小图/大图
            var scale = document.querySelector('.scale');
            var spic = document.querySelector('.smallpic');
            var sf = document.querySelector('.smallfang');
            var bf = document.querySelector('.bigfang');
            var bpic = document.querySelector('.bigpic');
            //1.鼠标划过小图，显示小放和大放
            spic.onmouseover = function () {
                sf.style.display = 'block';
                bf.style.display = 'block';

                //2.求小放大镜的尺寸。
                sf.style.width = spic.offsetWidth * bf.offsetWidth / bpic.offsetWidth + 'px';
                sf.style.height = spic.offsetHeight * bf.offsetHeight / bpic.offsetHeight + 'px';
                //4.求比例：比例>1  放大。
                var bili = bpic.offsetWidth / spic.offsetWidth;
                //3.鼠标移动，小放跟随。
                this.onmousemove = function (ev) {
                    var ev = ev || window.event;
                    var l = ev.clientX - scale.offsetLeft - sf.offsetWidth / 2 - 160;
                    var t = ev.clientY - scale.offsetTop - sf.offsetHeight / 2 - 150;
                    if (l < 0) {
                        l = 0;
                    } else if (l >= spic.offsetWidth - sf.offsetWidth) {
                        l = spic.offsetWidth - sf.offsetWidth;
                    }

                    if (t < 0) {
                        t = 0;
                    } else if (t >= spic.offsetHeight - sf.offsetHeight) {
                        t = spic.offsetHeight - sf.offsetHeight;
                    }
                    sf.style.left = l + 'px';
                    sf.style.top = t + 'px';

                    bpic.style.left = -l * bili + 'px';
                    bpic.style.top = -t * bili + 'px';
                }
            };

            spic.onmouseout = function () {
                sf.style.display = 'none';
                bf.style.display = 'none';
            };

            //小图切换 大图变
            $('.carousel_ul').on('click', 'li', function (ev) {
                var $imgurl = $(this).find('img').attr('src');
                $('.smallpic').find('img').attr('src', $imgurl);
                $('.bigpic').attr('src', $imgurl);
            });

            //数量增加
            var num = $('.textField');
            $('.jia').on('click', function () {
                num.val(parseInt(num.val()) + 1);
            });
            $('.jian').on('click', function () {
                num.val(parseInt(num.val()) - 1);
            });
            //商品数量和sid的存入
            var arrsid = []; //商品的sid
            var arrnum = []; //商品的数量
            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) { //判断商品是第一次存还是多次存储
                    arrsid = $.cookie('cookiesid').split(','); 
                    arrnum = $.cookie('cookienum').split(','); 
                }
            }

            $('.shoppingcart').on('click', function () {
                var $pic = $('.smallpic img').attr('pic');
                cookietoarray();
                if($.inArray($pic, arrsid) != -1) { //商品存在，数量叠加 
                    //先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
                    var num = parseInt(arrnum[$.inArray($pic, arrsid)]) + parseInt($('#pCount').val());
                    arrnum[$.inArray($pic, arrsid)] = num;
                    $.cookie('cookienum', arrnum.toString(), 10); 
        
                } else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
                    arrsid.push($pic); 
                    $.cookie('cookiesid', arrsid.toString(), 10); 
                    arrnum.push($('#pCount').val());
                    $.cookie('cookienum', arrnum.toString(), 10); 
                }
            })
        }
    });

})(jQuery);
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



(function(){
    $('.rightnowsubmit').on('click',function(){
        var $name=$('.name').val();
        var $pass=$('.pass').val();
        $.ajax({
                type:'post',
                url:'http://10.31.163.88/zhanleibo/php/login.php',
                data:{
                    name:$name,
                    pass:$pass,
                },
                success:function(data){
                    if(!data){
                        alert('用户名或者密码错误');
                        $('.pass').val('');
                    }else{
                        location.href="index.html";
                       // $.cookie('name',$name,{expires:100})
                    }
                }
            });
        });
    
})();
;(function(){
    $(function(){
        // 在键盘按下并释放及提交后验证提交表单

        $("#form").validate({

            rules : {

                name : {

                    required : true,

                    minlength : 11,
                    
                isMobile: true
                ,
                remote:{
                    url:"http://10.31.163.88/zhanleibo/php/registor.php",
                    type:"post",
                    }
                },

                password : {

                    required : true,

                    minlength : 6,
                    maxlength: 20,

                },

                repass: {
                    required: true,
                    equalTo: '#password'
                },
                submit:{
                    required:true,
                }  ,

            },

            messages : {
                name : {

                    required : "请输入手机号码",

                    minlength : "手机号长度不能小于11位",

                    remote:'用户名已存在',
                    isMobile: '请填写正确的手机号码,方便接收订单通知、找回密码等',

                },

                password : {

                    required : "请输入密码",

                    minlength : "建议使用大小写字母、数字和符号两种以上的组合，6-20个字符",
                    maxlength: '长度不能大于20位',

                },

                repass: {

                    required : "请输入密码",

                    equalTo : "两次密码输入不一致"

                },
                submit:{
                    required:'错误'
                }

            }

        });
    
    
    })
        $.validator.setDefaults({
            /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
            success: function(label){
                label.text('√').css('color','green').addClass('valid');
            }
        });
     //手机号码验证

     $.validator.addMethod("isMobile", function (value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写手机号码");

        
})();
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