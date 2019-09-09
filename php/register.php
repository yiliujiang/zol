<?php  
	
    include "conn.php";
    
if(isset($_GET['checkname'])){
$username=$_GET['checkname'];
	
$result=mysql_query("select * from zoluser where user=$username");

$wronglist=mysql_fetch_array($result,MYSQL_ASSOC);

if($wronglist){
    echo true;
}else{
    echo false;
}

}


if(isset($_POST['user'])&&isset($_POST['pass'])){
    $name=$_POST['user'];
    $pass=$_POST['pass'];
    //添加数据库
    mysql_query("insert into zoluser values(null,'$name','$pass')");
    //php的跳转
    echo true;
}