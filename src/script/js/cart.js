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