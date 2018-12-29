<?php
    $uname = isset($_GET["uname"])?$_GET["uname"]:null;
    $del = isset($_GET["del"])?$_GET["del"]:null;
    $price = isset($_GET["price"])?$_GET["price"]:null;
    $shan = isset($_GET["shan"])?$_GET["shan"]:null;

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
    $res = $conn->query('delete from usergoods where price="'.$price.'"');
    if($res){
        echo "登陆成功";  
    }else{  
         echo "用户名与密码不匹配";  
    }
?>