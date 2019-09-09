<?php
header('content-type:text/html;charset=utf-8');//设置字符编码
$conn=mysql_connect('localhost','root','');
if(!$conn){
    die('数据库连接错误'.mysql_error());
}

//选择数据库
mysql_select_db('zol');

mysql_query('SET NAMES UTF8');

?>