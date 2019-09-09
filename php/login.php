<?php  
	
    include "conn.php";

    if(isset($_POST['user'])&&isset($_POST['pass'])){
        $name=$_POST['user'];
        $pass=$_POST['pass'];
            
        $result=mysql_query("select * from zoluser where user='$name' and password='$pass'");
        
        $exist=mysql_fetch_array($result,MYSQL_ASSOC);
        if($exist){
            echo true;
        }else{
            echo false;
        }
        
        }