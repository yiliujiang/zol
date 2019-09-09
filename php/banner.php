<?php  
	
	include "conn.php";
    // $key=$_GET['class'];
	$result=mysql_query("select * from zolpic where type='banner'");
	
	$arrdata=array();
	for ($i=0; $i < mysql_num_rows($result); $i++) { 
		$arrdata[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}
	echo json_encode($arrdata);


