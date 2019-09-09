$(document).ready(function () {

$('#loginBtn').on('click',function(){
    $.ajax({
        url:'http://10.31.157.17/js19075-8week/zol/php/login.php',
        type:'post',
        data:{
            user: $('#loginUser').val(),
            pass: $('#loginpas').val()
        },
        success: function (d) {
            if (!d) {
                alert('用户名或密码错误');
            } else {
                addcookie('customname', $('#loginUser').val().toString(),10);
                location.href = 'http://10.31.157.17/js19075-8week/zol/dist/index.html';
                
            }
        }
    })
})






















})