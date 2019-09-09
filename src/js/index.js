$(document).ready(function () {

    //如果有cookie存储用户名就渲染
    if (getcookie('customname')) {
        $('.login-detail').css({
            display: 'none'
        })
        $('.login-exit').css({
            display: 'inline-block'
        })
        $('.user-name').html(getcookie('customname'))
    }

    //点击退出本账户
    $('.login-exit .close').on('click', function () {
        addcookie('customname', 0, -1);
        $('.login-detail').css({
            display: 'inline-block'
        })
        $('.login-exit').css({
            display: 'none'
        })

    })
    //头部固定定位

    $(window).on('scroll', function () {
        var $top = $(window).scrollTop(); //滚动条的top值
        if ($top >= 98) {
            $('.header-navs').css({
                position: "fixed",
                top: 0,
                left: 0,
                right: 0
            });
        } else {
            $('.header-navs').css({
                position: "static",
            });
        }
    })
    //轮播图
    //请求轮播图数据
    function Banner() {
        this.$slideBox = $('.slideBox');
        this.$prev = $('.slideBox .prev');
        this.$next = $('.slideBox .next');
        this.$liwidth = $('.banner-box').width();
        this.$scli = $('.hd ul li');
        this.$scindex = null;
        this.timer = null;
    }

    Banner.prototype.init = function () {
        $.ajax({
            url: 'http://10.31.157.17/js19075-8week/zol/php/banner.php',
            dataType: 'json'
        }).done(function (data) {
            var $html = '';

            $.each(data, function (index, value) {
                $html += `
              <li style="float:left;">
                <a href="javascript:;" target="_blank">
                   <img src="${value.url}">
                </a>
             </li>
               `
            })
            $('.tempWrap ul').html($html);
        })

        this.move();

    }
    Banner.prototype.move = function () {
        var _this = this;
        this.$scli.hover(function () {
            this.$scindex = $(this).index();
            _this.switch(this.$scindex);
        })
        this.$prev.on('click', function () {
            _this.left();
        })
        this.$next.on('click', function () {
            _this.right();
        })
        this.timer = setInterval(function () {
            _this.right();
        }, 2000)
        this.$slideBox.hover(function () {
            clearInterval(_this.timer);
        }, function () {
            _this.timer = setInterval(function () {
                _this.right();
            }, 2000)
        })
    }

    Banner.prototype.switch = function (num) {
        this.$scli.eq(num).addClass('on').siblings().removeClass('on')
        $('.tempWrap ul').stop(true).animate({
            left: -this.$liwidth * num
        })
    }

    Banner.prototype.left = function () {
        this.$scindex--;
        if (this.$scindex < 0) {
            this.$scindex = this.$scli.length - 1;
        }
        this.switch(this.$scindex);
    }

    Banner.prototype.right = function () {
        this.$scindex++;
        if (this.$scindex > this.$scli.length - 1) {
            this.$scindex = 0;
        }
        this.switch(this.$scindex);
    }

    let ban = new Banner;
    ban.init();



    //今日热卖
    function Taday_buy() {}

    Taday_buy.prototype.init = function () {
        $.ajax({
            url: 'http://10.31.157.17/js19075-8week/zol/php/taday_buy.php',
            dataType: 'json'
        }).done(function (data) {
            var $html = '';
            $.each(data, function (index, value) {
                $html += `
                <div class="item fl">
                <div class="pic-case">
                    <a href="http://10.31.157.17/js19075-8week/zol/dist/detail.html?sid=${value.sid}" target="_blank">
                        <span class=""></span>
                        <img src="${value.url}"
                            alt="${value.title}">
                    </a>
                </div>
                <div class="pic-text">
                    <a href="" target="_blank">${value.title}</a>
                </div>
                <div class="foot-price">
                    <span class="now">￥</span>${value.price}
                    <span class="original">${value.reprice}</span>
                </div>
            </div>
               `
            })
            $('.taday .pic-list').html($html);
        })
    }
    var taday = new Taday_buy;
    taday.init();

    function Huimai() {}
    //会买专辑
    Huimai.prototype.init = function () {
        $.ajax({
            url: 'http://10.31.157.17/js19075-8week/zol/php/huimai.php',
            dataType: 'json'
        }).done(function (data) {
            var $html = '';
            $.each(data, function (index, value) {
                $html += `
                <div class="item fl">
                <div class="pic-case">
                    <a href="http://10.31.157.17/js19075-8week/zol/dist/detail.html?sid=${value.sid}" target="_blank">
                        <img src="${value.url}"
                            alt="${value.title}">
                    </a>
                </div>
                <div class="pic-text"><a href="detail.html?sid=${value.sid}" target="_blank">原价都是一千两千三千的东西现在免费送礼了</a></div>
            </div>
               `
            })
            $('.huimai .pic-list').html($html);
        })
    }
    var huimai = new Huimai;
    huimai.init();

    function Indextab() {
        this.$slidegroup = $('.slideGroup');
        this.$listtitle = $('.slideGroup h2');
        this.$lists = $('.parBd .refresh-list');
    }
    Indextab.prototype.init = function () {
        var _this = this;
        this.$listtitle.hover(function () {
            let $listindex = $(this).index();
            $(this).addClass('hcolor').siblings().removeClass('hcolor');
            _this.$lists.eq($listindex).addClass('show').siblings().addClass('hide').removeClass('show');
        })
    }

    let indextab = new Indextab;
    indextab.init();

    //页面悬浮二维码
    function Qrcode() {
        this.$close = $('.close');
    }
    Qrcode.prototype.init = function () {
        var _this = $(this);
        this.$close.on('click', function () {
            $('#float-qrcode').hide();
        })
    }

    let qrcode = new Qrcode;
    qrcode.init();




})