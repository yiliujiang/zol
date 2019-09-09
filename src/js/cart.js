$(document).ready(function () {

    //购物车

    function Car() {
        this.arrsid = [];
        this.arrnum = [];
        this.len = null;

    }
    Car.prototype.init = function () {
        var _this = this;
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            this.arrsid = getcookie('cookiesid').split(','); //数组sid
            this.arrnum = getcookie('cookienum').split(','); //数组num
            $.each(this.arrsid, function (index, value) {
                _this.goodslist(_this.arrsid[index], _this.arrnum[index]);
            });
        } else {
            this.kong();
        }
        this.total_price();
        this.checkchange();
        this.numchange();
        this.deletegoods();
        this.batchdelete();
        this.inputchange();

    }
    Car.prototype.goodslist = function (sid, num) {
        $.ajax({
            url: 'http://10.31.157.17/js19075-8week/zol/php/cart.php',
            dataType: 'json'
        }).done(function (data) {
            $.each(data, function (index, value) {
                if (sid == value.sid) {
                    var $clonetr = $('.cart-lists:hidden').clone(true, true);
                    $clonetr.find('img').attr('src', value.url);
                    $clonetr.find('img').attr('sid', value.sid);
                    $clonetr.find('img').attr('alt', value.title);
                    $clonetr.find('.inforbox').find('.infora').html(value.title);
                    $clonetr.find('.inforbox').find('.infora').attr('href', 'http://10.31.157.17/js19075-8week/zol/dist/detail.html?sid=' + value.sid);
                    $clonetr.find('.s-amount').find('.text-amount').val(num);
                    $clonetr.find('.s-price').find('.s-old-price').html(value.reprice);
                    $clonetr.find('.s-price').find('.new-price').html(value.price);
                    $clonetr.find('.s-total').find('em').html(value.price * num);
                    $clonetr.css('display', 'table-row');
                    $('tbody').append($clonetr);
                }

            })
        })
    }
    Car.prototype.kong = function () {
        $('.kong').show();
        $('.order-table').hide();
    }
    Car.prototype.total_price = function () {
        this.len = this.arrsid.length;
        $('.cart-state  .cart-state-num').html('(' + this.len + '/30)');
        setTimeout(function () {
            $(".cart-list-input:hidden").removeAttr("checked");
            let $xuanzhong = $('.cart-list-input:checked');
            var $total_price = null;
            $.each($xuanzhong, function (index, value) {
                $total_price += parseInt($(value).parents('.cart-lists').find('.s-total').find('em').html())
            })
            $('.total-cart-price').html($total_price);
        }, 100)
    }
    Car.prototype.numchange = function () {
        var _this = this;

        $('.minus').on('click', function () { //减号
            let count = parseInt($(this).parents('.cart-lists').find('.text-amount').val());
            count--;
            if (count <= 1) {
                count = 1;
            }
            $(this).parents('.cart-lists').find('.text-amount').val(count);
            let $sumprice = count * $(this).parents('.cart-lists').find('.new-price').html();
            $(this).parents('.cart-lists').find('.s-total').find('em').html($sumprice);
            _this.total_price();

            _this.cookiechange($(this));
        })

        $('.plus').on('click', function () { //点击加号
            let count = parseInt($(this).parents('.cart-lists').find('.text-amount').val());
            count++;
            if (count >= 99) {
                count = 99;
            }

            $(this).parents('.cart-lists').find('.text-amount').val(count);
            let $sumprice = count * $(this).parents('.cart-lists').find('.new-price').html();
            $(this).parents('.cart-lists').find('.s-total').find('em').html($sumprice);
            _this.total_price();
            _this.cookiechange($(this));
        })

    }
    Car.prototype.cookiechange = function (obj) {
        let $index = obj.parents('.cart-lists').find('img').attr('sid');
        this.arrnum[$.inArray($index, this.arrsid)] = obj.parents('.cart-lists').find('.text-amount').val();
        addcookie('cookienum', this.arrnum.toString(), 10);
    }
    Car.prototype.checkchange = function () {
        var _this = this;
        let $xuanzhong = $('.cart-list-input:checked');
        $xuanzhong.on('change', function () {
            _this.total_price();
        })

    }
    Car.prototype.deletegoods = function () {
        var _this = this;
        $('.deletegood').on('click', function () {
            $(this).parents('.s-delbox').find('.deletebox').css({
                display: "block"
            })

            $('.true').on('click', function () {
                $(this).parents('.cart-lists').remove();
                let $sid = $(this).parents('.cart-lists').find('img').attr('sid');
                _this.deletecookie($sid);
                _this.total_price();
            })
            $('.false').on('click', function () {
                $(this).parents('.s-delbox').find('.deletebox').css({
                    display: "none"
                })
            })



        })
    }
    Car.prototype.deletecookie = function (sid) {
        var _this = this;
        $.each(_this.arrsid, function (index, value) {
            if (sid == value) {
                var $index = index;
                // console.log($index);
                _this.arrsid.splice($index, 1);
                _this.arrnum.splice($index, 1);
                addcookie('cookiesid', _this.arrsid.toString(), 10);
                addcookie('cookienum', _this.arrnum.toString(), 10);
            }

            _this.total_price();
        })
    }
    Car.prototype.batchdelete = function () {
        var _this = this;
        $('.batch').on('click', function () {
            if (confirm('你确定要删除吗？')) {
                $.each($('.cart-list-input'), function (index, value) {
                    if ($(this).is(':checked')) {
                        $(this).parents('.cart-lists').remove();
                        let $sid = $(this).parents('.cart-lists').find('img').attr('sid');
                        _this.deletecookie($sid);
                        _this.total_price();
                    }

                })
            }

        })

    }
    Car.prototype.inputchange=function(){
        var _this=this;
        $('.text-amount').on('input',function(){
            var $reg=/^\d+$/g;
            var $goodnum=$(this).val();
            if ($reg.test($goodnum)){
                if ($goodnum >= 99) {//限定范围
                    $(this).val(99);
                } else if ($goodnum <= 1) {
                    $(this).val(1);
                } else {
                    $(this).val($goodnum);
                }  
            }else{
                $(this).val(1); 
            }
            $(this).parents('.cart-lists').find('.s-total em').html($(this).val()*$(this).parents('.cart-lists').find('.new-price').html());
            _this.total_price();
            _this.cookiechange($(this));


        })

    }
    let car = new Car;
    car.init();



    if(getcookie('customname')){
        $('.zc-login').html('您好');
        $('.login-now').html(getcookie('customname'));
        $('.login_act a').html('退出');   
        $('.login_act a').attr('href','javascript:;')
    }

    $('.login_act a').on('click',function(){
        addcookie('customname', 0, -1);
        $('.login_act a').attr('href','http://10.31.157.17/js19075-8week/zol/dist/login.html');
    })




    
setInterval(function(){
    var nowTime = new Date();
    var futureTime = new Date('2019,9,30 18:00:00');

    var time =parseInt( (futureTime - nowTime) / 1000 ); 
    var hour = parseInt(time % 86400 / 3600);
    var min = parseInt(time % 3600 / 60);
    var sec = time % 60;


    $('.time-hour').html(hour);
    $('.time-min').html(min);
    $('.time-sec').html(sec);
},1000);

})