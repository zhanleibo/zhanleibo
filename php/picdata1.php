<?php
    include "conn.php";
    $result=mysql_query("select * from ule ORDER BY RAND() LIMIT 8;");
    $arr=array();
    for($i=0;$i<mysql_num_rows($result);$i++){
        $arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
    }

    echo json_encode($arr);
?>