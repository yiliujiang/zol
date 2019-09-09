$(document).ready(function () {


    // 表单验证

    //手机号验证





    var phoneflag = null;
    var codeflag = null;
    var pasflag = null;
    var repasflag = null;
    var regReadflag = true;
    $('#phone_number').on('blur', function () {  
        let $invalue = $('#phone_number').val();
        if ($invalue != "") {
            let $regphone = /^1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8}$/g;

            if ($regphone.test($(this).val())) {
                $(this).parents('.register-form').find('.right-tips').css({
                    display: 'block'
                })
                $(this).parents('.register-form').find('.wrong-tips').css({
                    display: 'none'
                })
                phoneflag = true;
                $.ajax({
                    url: 'http://10.31.157.17/js19075-8week/zol/php/register.php',
                    data: { //给后端
                        checkname: $('#phone_number').val()
                    },
                    success: function (d) {
                        if (!d) {
                            $('#phone_number').parents('.register-form').find('.right-tips').css({
                                display: 'block'
                            })
                            $('#phone_number').parents('.register-form').find('.wrong-tips').css({
                                display: 'none'
                            })
                            phoneflag = true;
                        } else {
                            $('#phone_number').parents('.register-form').find('.right-tips').css({
                                display: 'none'
                            });
                            $('#phone_number').parents('.register-form').find('.wrong-tips').css({
                                display: 'block'
                            });
                            $('#phone_number').parents('.register-form').find('.wrong-tips').html('该手机号码已被注册');
                            phoneflag = false;
                        }
                    }
        
                })
            } else {
                $(this).parents('.register-form').find('.right-tips').css({
                    display: 'none'
                });
                $(this).parents('.register-form').find('.wrong-tips').css({
                    display: 'block'
                });
                $(this).parents('.register-form').find('.wrong-tips').html('手机号码输出错误');
                phoneflag = false;
            }
        } else {
            $(this).parents('.register-form').find('.wrong-tips').css({
                display: 'block'
            });
            $(this).parents('.register-form').find('.wrong-tips').html('手机号码不能为空');
            phoneflag = false;
        }
    })
    $('#phone_send').on('click', function () {
        let codenum = ''
        for (var i = 0; i < 4; i++) {
            codenum += Math.floor(Math.random(0, 10) * 10);
        }
        $('.codenum').html(codenum).css({
            display: "inline-block"
        });
    })
    $('#phone_code').on('blur', function () {
        if ($('#phone_code').val() != '') {
            if ($('#phone_code').val() == $('.codenum').html()) {
                $(this).parents('.register-form').find('.right-tips').css({
                    display: 'block'
                })
                $(this).parents('.register-form').find('.wrong-tips').css({
                    display: 'none'
                })
                codeflag = true;
            } else {
                $(this).parents('.register-form').find('.right-tips').css({
                    display: 'none'
                });
                $(this).parents('.register-form').find('.wrong-tips').css({
                    display: 'block'
                });
                $(this).parents('.register-form').find('.wrong-tips').html('验证码错误')
                codeflag = false;
            }
        } else {
            $(this).parents('.register-form').find('.wrong-tips').css({
                display: 'block'
            });
            $(this).parents('.register-form').find('.wrong-tips').html('验证码不能为空');
            codeflag = false;
        }
    })

    $('#pasword_phone').on('blur', function () {
        if ($('#pasword_phone').val() != '') {
            let $regpasword = /^[a-zA-Z]{1}[a-zA-Z0-9]{5,15}$/g;
            if ($regpasword.test($(this).val())) {
                $(this).parents('.register-form').find('.right-tips').css({
                    display: 'block'
                });
                $(this).parents('.register-form').find('.wrong-tips').css({
                    display: 'none'
                });
                pasflag = true;
            } else {
                $(this).parents('.register-form').find('.right-tips').css({
                    display: 'none'
                });
                $(this).parents('.register-form').find('.wrong-tips').css({
                    display: 'block'
                });
                $(this).parents('.register-form').find('.wrong-tips').html('密码格式错误');
                pasflag = false;
            }
        } else {
            $(this).parents('.register-form').find('.wrong-tips').html('密码不能为空');
            $(this).parents('.register-form').find('.wrong-tips').css({
                display: 'block'
            });
            pasflag = false;
        }
    })

    $('#regPasword_phone').on('blur', function () {
        if ($('#regPasword_phone').val() != '') {
            if ($('#regPasword_phone').val() == $('#pasword_phone').val()) {
                $(this).parents('.register-form').find('.right-tips').css({
                    display: 'block'
                });
                $(this).parents('.register-form').find('.wrong-tips').css({
                    display: 'none'
                });
                repasflag = true;
            } else {
                $(this).parents('.register-form').find('.right-tips').css({
                    display: 'none'
                });
                $(this).parents('.register-form').find('.wrong-tips').css({
                    display: 'block'
                });
                $(this).parents('.register-form').find('.wrong-tips').html('密码与上一次不一致');
                repasflag = false;
            }
        } else {
            $(this).parents('.register-form').find('.wrong-tips').html('密码不能为空');
            $(this).parents('.register-form').find('.wrong-tips').css({
                display: 'block'
            })
            repasflag = false;
        }
    })


    $('#regRead_phone').on('click',function(){
        if ($('#regRead_phone').is(':checked')) {
            regReadflag = true;
        } else {
            regReadflag = false;
        }
    })


    $('#phone_submit').on('click', function () {
        console.log(phoneflag);
        console.log(codeflag);
        console.log(pasflag);
        console.log(repasflag);
        console.log(regReadflag);
        if (!phoneflag || !codeflag || !pasflag || !repasflag || !regReadflag) {
          alert('请正确填写注册信息');
          location.href = 'http://10.31.157.17/js19075-8week/zol/dist/register.html';
        }else{
            $.ajax({
                url:'http://10.31.157.17/js19075-8week/zol/php/register.php',
                type:'post',
                data:{
                    user: $('#phone_number').val(),
                    pass: $('#pasword_phone').val()
                },
                success:(function(d){
                    if(d){
                        location.href = 'http://10.31.157.17/js19075-8week/zol/dist/index.html';
                    }
                })
            })
        }
    })

   











})