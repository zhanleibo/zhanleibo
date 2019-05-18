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