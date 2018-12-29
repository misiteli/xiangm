<?php
    $uname = isset($_GET["uname"])?$_GET["uname"]:null;
    $mima = isset($_GET["mima"])?$_GET["mima"]:null;
    // 1.创建连接,测试是否连接成功
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'zouxiu';
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        var_dump($conn->connect_error);
    }

    //2.查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');
    //3.执行查询语句，得到查询结果集(对象)
    $res = $conn->query('select * from yonghu where uname="'.$uname.'" and mima="'.$mima.'"');
    if($res->num_rows > 0){
        echo "登陆成功";  
    }else{  
         echo "用户名与密码不匹配";  
    }
?>