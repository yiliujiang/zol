! function ($) {

    //放大镜效果
    function Detail() {
        this.picid = location.search.substring(1).split('=')[1];
        this.$focus = $('.zs-focus');
        this.$sf = $('#sf');
        this.$spic = $('#spic');
        this.$simg = $('#spic').find('img');
        this.$bpic = $('#bpic');
        this.$bf = $('#bf');
        this.$bili = null;
        this.$ul = $('#zs-focus-list ul');
    }
    Detail.prototype.init = function () {
        $.ajax({
            url: 'http://10.31.157.17/js19075-8week/zol/php/detail.php',
            data: {
                sid: this.picid
            },
            dataType: 'json'
        }).done(function (data) {
            $('#spic img').attr('src',data.url);
            $('#bpic').attr('src', data.url);
            $('#spic img').attr('sid', data.sid);
            $('#goods-title').html(data.title);
            $('#zp-goods-price').html(data.price);
            $('#zp-goods-reprice').html(data.reprice);
            $('#zp-suit-desc').html(data.title);
            $('.save-icon-num').html(data.reprice - data.price);
            var arr = data.urls.split(',');
            var str = '';
            $.each(arr, function (index, value) {
                str += '<li><img src="' + value + '"/></li>';
            });
            $('#zs-focus-list ul').html(str);
        })

        this.scale();
    }
    Detail.prototype.scale = function () {

        var _this = this;
        this.$sf.css({
            width: this.$spic.width() * this.$bf.width() / this.$bpic.width(),
            height: this.$spic.height() * this.$bf.height() / this.$bpic.height()
        })

        this.$bili = this.$bpic.width() / this.$spic.width();

        this.$spic.hover(function () {
            $('#sf,#bf').css('visibility', 'visible');
            _this.$spic.on('mousemove', function (ev) {
                _this.drag(ev); //拖拽
            })
        }, function () {
            $('#sf,#bf').css('visibility', 'hidden');
        })


        this.$ul.on('click', 'li', function () {
            _this.changeurl($(this));
        })
    }
    Detail.prototype.drag = function (ev) {
        let l = ev.pageX - this.$focus.offset().left - this.$sf.width() / 2;
        let r = ev.pageY - this.$focus.offset().top - this.$sf.height() / 2;
        if (l <= 0) {
            l = 0;
        } else if (l >= this.$spic.width() - this.$sf.width()) {
            l = this.$spic.width() - this.$sf.width()
        }
        if (r <= 0) {
            r = 0;
        } else if (r >= this.$spic.height() - this.$sf.height()) {
            r = this.$spic.height() - this.$sf.height()
        }

        this.$sf.css({
            left: l,
            top: r
        })

        this.$bpic.css({
            left: -l * this.$bili,
            top: -r * this.$bili
        })
    }
    Detail.prototype.changeurl = function (obj) {
        let $imgurl = obj.find('img').attr('src');
        this.$spic.find('img').attr('src', $imgurl);
        this.$bpic.attr('src', $imgurl);
        this.$sf.css({
            width: this.$spic.width() * this.$bf.width() / this.$bpic.width(),
            height: this.$spic.height() * this.$bf.height() / this.$bpic.height()
        })

        this.$bili = this.$bpic.width() / this.$spic.width();
    }


    let detail = new Detail;
    detail.init();






    // 最火团购
    function Group_hot() {}

    Group_hot.prototype.init = function () {
        $.ajax({
            url: 'http://10.31.157.17/js19075-8week/zol/php/taday_buy.php',
            dataType: 'json'
        }).done(function (data) {
            data.length = 3;
            var $html = '';
            $.each(data, function (index, value) {
                $html += `
                <li>
                <a href="http://10.31.157.17/js19075-8week/zol/dist/detail.html?sid=${value.sid}" class="pic">
                    <img src="${value.url}"
                        alt="${value.title}">
                </a>
                <p class="ware-name">
                    <a href="http://10.31.157.17/js19075-8week/zol/dist/detail.html?sid=${value.sid}">${value.title}</a>
                </p>
                <div class="price">
                    <span class="now">￥${value.price}</span>
                    <span class="original">￥${value.reprice}</span>
                </div>
            </li>
               `
            })
            $('#group-rec-list').html($html);
        })
    }
    var grouphot = new Group_hot;
    grouphot.init();


    // 同类热卖
    function Same_hot() {}

    Same_hot.prototype.init = function () {
        $.ajax({
            url: 'http://10.31.157.17/js19075-8week/zol/php/taday_buy.php',
            dataType: 'json'
        }).done(function (data) {
            data.length = 3;
            var $html = '';
            $.each(data, function (index, value) {
                $html += `
                <li>
                <a href="http://10.31.157.17/js19075-8week/zol/dist/detail.html?sid=${value.sid}" class="z_lookmore_class" target="_blank">
                    <img src="${value.url}"
                        alt="${value.title}" border="0" style="height:168px;width:168px;">
                </a>
                <div class="zs-price">
                    <span class="zs-sale-price">¥<em>${value.price}</em></span>
                </div>
                <span class="title"><a href="http://10.31.157.17/js19075-8week/zol/dist/detail.html?sid=${value.sid}" class="z_lookmore_class" target="_blank">${value.title}</a></span>
            </li>
               `
            })
            $('#hot-goods-list').html($html);
        })
    }
    var samehot = new Same_hot;
    samehot.init();

    // 最新热卖
    function New_hot() {}

    New_hot.prototype.init = function () {
        $.ajax({
            url: 'http://10.31.157.17/js19075-8week/zol/php/taday_buy.php',
            dataType: 'json'
        }).done(function (data) {
            data.length = 3;
            var $html = '';
            $.each(data, function (index, value) {
                $html += `
                <li>
                <a class="sc_left_cuxiao_class" href="http://10.31.157.17/js19075-8week/zol/dist/detail.html?sid=${value.sid}" target="_blank">
                    <img src="${value.url}" border="0"
                        width="168px">
                </a>
                <div class="zs-price">
                    <span class="zs-sale-price">¥<em>${value.price}</em></span>
                    <span class="zs-original-price">¥<em>${value.reprice}</em></span>
                </div>
                <span class="title">
                    <a href="http://10.31.157.17/js19075-8week/zol/dist/detail.html?sid=${value.sid}">${value.title}</a></span>
            </li>
               `
            })
            $('#promo-goods-list').html($html);
        })
    }
    var newhot = new New_hot;
    newhot.init();




    function Detailtab() {}
    Detailtab.prototype.init = function () {
        $('#zp-tabbar li').not('.phone-purchase-code').on('click', function () {
            let liindex = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.zs-container').children().eq(liindex).addClass('zs-show').siblings().removeClass('zs-show').addClass('zs-hide');
        })
        $('.phone-purchase-code').hover(function () {
            $('.phone-purchase .code ').show();
        }, function () {
            $('.phone-purchase .code ').hide();
        })

        $('#zp-tabbar li:first').on('click', function () {
            $('.introduct').show();
            $('.serve-nav').hide();
        })
        $('#zp-tabbar li').not('.promise').not('#hides').on('click',function(){
            $('.introduct').hide();
            $('.serve-nav').hide();
        })
        $('.promise').on('click', function () {
            $('.serve-nav').show();
            $('.introduct').hide();
        })


        $('.goods-introduct').on('click', function () {
            $('#zp-tabbar li:first').on('click', function () {

            });
        })

        $('.goods-introduct').on('click', function () {
            $('#zp-tabbar li:first').addClass('active').siblings().removeClass('active');
            $('.zs-goods-detail').addClass('zs-show').siblings().removeClass('zs-show').addClass('zs-hide');
        })

        $('.serve-promise').on('click', function () {
            $('.promise').addClass('active').siblings().removeClass('active');
            $('.zs-service-guarantee').addClass('zs-show').siblings().removeClass('zs-show').addClass('zs-hide');
        })
        // this.navflex();
        this.louti();

    }

    Detailtab.prototype.louti = function () {
        let $loutinav = $('.serve-nav');
        let $louceng = $('.zbz-sevice-title');
        let $loutinavli = $('.serve-nav li');
        $(window).on('scroll', function () {
            let $topvalue = $(this).scrollTop();
            $louceng.each(function (index, element) {
                let $loucengtop = $(element).offset().top + $(element).height() / 2;
                if ($loucengtop > $topvalue) {
                    var $index=$(this).index();
                    // console.log($index);
                    let $loutinava = $('.serve-nav a');
                    // $loutinava.eq($index).addClass('louticolor').siblings().addClass('loutili').removeClass('louticolor');
                    return false;
                }
            })
        })


        $loutinavli.on('click', function () {


            $(this).parents('.serve-nav').find('a').removeClass('louticolor');

    $(this).find('a').addClass('louticolor');
            let $top = $louceng.eq($(this).index()).offset().top;
            $('html').animate({
                scrollTop: $top
            });
        })

    }

    let detailtab = new Detailtab;
    detailtab.init();

    let height = $('.zs-tabbar-nav ').offset().top;
    $(window).on('scroll', function () {
        let $topvalue = $(window).scrollTop();
        if ($topvalue > 940) {

            $('.zs-tabbar-nav ').css({
                position: "fixed",
                top: 0,
                left: 0,
                margin: 0,
                width: "100%"
            })
            $('#zp-tabbar').css({
                width: 999,
                paddingLeft: 201,
                margin: "0 auto",
            })

            $('.zs-buy-btn').css({
                display: "list-item"
            })
            $('.zs-sidebar').css({
                position: "fixed",
                top: 36,
                left:"50%",
                marginLeft:400
            })
        } else {
            $('.zs-tabbar-nav ').css({
                position: "static",
                top: 940,
                marginTop: 10,
                width: 990
            })

            $('#zp-tabbar').css({
                width: 990,
                paddingLeft: 0,
                margin: "0 auto",
            })

            $('.zs-buy-btn').css({
                display: "none"
            })

            $('.zs-sidebar').css({
                position: "static",
                top: 36
            })
        }
    })


    function Num() {
      this.count=$('.zs-goods-number').val();
    }

    Num.prototype.init = function () {
        var _this=this;
      $('.zs-decrease').on('click',function(){
        _this.count--;
        if(_this.count<=1){
            _this.count=1;
        }
        $('.zs-goods-number').val(_this.count);
      })
      $('.zs-increase').on('click',function(){
        _this.count++;
        if(_this.count>=99){
            _this.count=99;
        }
        $('.zs-goods-number').val(_this.count);
      })

      $('.zs-goods-number').on('input',function(){
        var $reg=/^\d+$/g;
        _this.count=$(this).val();
        if ($reg.test(_this.count)){
            if (_this.count>= 99) {//限定范围
                $(this).val(99);
            } else if (_this.count <= 1) {
                $(this).val(1);
            } else {
                $(this).val(_this.count);
            }  
        }else{
            $(this).val(1); 
        }
    })



    }
    let num = new Num;
    num.init();

    //购物车
    
    function Cookie_storage(){
        this.arrsid = []; //sid
        this.arrnum = []; //数量
       
    }
    Cookie_storage.prototype.init=function(){
        var _this=this;
        $('.zs-store-buy').on('click', function(){
            _this.$sid = $(this).parents('.zs-deal-detail').find('#spic img').attr('sid');
            _this.cookietoarray();
            if($.inArray(_this.$sid, _this.arrsid) != -1) { //商品存在，数量叠加 
                let num = parseInt(_this.arrnum[$.inArray(_this.$sid, _this.arrsid)]) + parseInt($('.zs-goods-number').val());
                _this.arrnum[$.inArray(_this.$sid, _this.arrsid)] = num;
                addcookie('cookienum', _this.arrnum.toString(), 10); //数组存入cookie
                $('#zs-shop-cart-box').css({
                    display:"block",
                    position:"fixed",
                })
                _this.getcookie();
            } else { //不存在
                _this.arrsid.push(_this.$sid); //将当前的id存入数组
                addcookie('cookiesid', _this.arrsid.toString(), 30); //数组存入cookie
                _this.arrnum.push($('.zs-goods-number').val());
                addcookie('cookienum', _this.arrnum.toString(), 30); //数组存入cookie
            }
        })
    }
    Cookie_storage.prototype.cookietoarray=function() {
		if(getcookie('cookiesid') && getcookie('cookienum')) {//判断商品是第一次存还是多次存储
			this.arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
			this.arrnum = getcookie('cookienum').split(','); //cookie商品的num
		}
    }
    Cookie_storage.prototype.getcookie=function(){
        var _this=this;
        var $sump=null;
        $.ajax({
            url: 'http://10.31.157.17/js19075-8week/zol/php/cart.php',
            dataType: 'json'
        }).done(function(data){
            $.each(data, function (index, value) {
                $.each(_this.arrsid,function(i,v){
                    if(v==value.sid){
                        let $index=$.inArray(v, _this.arrsid)
                        $sump+=value.price*_this.arrnum[$index];
                    }
                })
               
            })

            $('#zs-cart-number').html(_this.arrsid.length);
            $('#zs-total-price').html($sump);

            _this.close();

        })
    }
    Cookie_storage.prototype.close=function(){
        $('.zs-close').on('click',function(){
            $('#zs-shop-cart-box').css({
                display:'none'
            })
        })
    }

let cartcookie=new Cookie_storage;
cartcookie.init();


if(getcookie('customname')){
    $('.zc-login').html('您好');
    $('.login-now').html(getcookie('customname'));
    $('.login-now').attr('href','javascript:;')
    $('.zc-register a').html('退出');   
    $('.zc-register a').attr('href','javascript:;')

    $('.cart').on('click',function(){
        $('.cart').attr('href','http://10.31.157.17/js19075-8week/zol/dist/cart.html');
    })
    $('.back-cart').on('click',function(){
        $('.back-cart').attr('href','http://10.31.157.17/js19075-8week/zol/dist/cart.html');
    })
    
}else{
    $('.cart').on('click',function(){
        alert("请登录");
    })
    $('.back-cart').on('click',function(){
        alert("请登录");
    })

}



$('.zc-register a').on('click',function(){
    addcookie('customname', 0, -1);
    $('.zc-login').html('Hi~欢迎来到Z商城，请');
    $('.login-now').html('登录');
    $('.zc-register a').html('免费注册'); 
    location.href = 'http://10.31.157.17/js19075-8week/zol/dist/index.html';
})

setInterval(function(){
    var nowTime = new Date();
    var futureTime = new Date('2019,9,30 18:00:00');

    var time =parseInt( (futureTime - nowTime) / 1000 ); 
    var day = parseInt(time / 86400);
    var hour = parseInt(time % 86400 / 3600);
    var min = parseInt(time % 3600 / 60);
    var sec = time % 60;

    $('.time-day').html(day+'天');
    $('.time-hour').html(hour+'时');
    $('.time-min').html(min+'分');
    $('.time-sec').html(sec+'秒');
},1000);





}(jQuery)