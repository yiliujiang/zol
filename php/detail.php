<?php  
	
	include "conn.php";

    $id=$_GET['sid'];
    
	$result=mysql_query("select * from zolpic where sid=$id"); 
    $arrdata=mysql_fetch_array($result,MYSQL_ASSOC);
	echo json_encode($arrdata);

