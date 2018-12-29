<?php
    $uname = isset($_GET["uname"])?$_GET["uname"]:null;
    $id = isset($_GET["id"])?$_GET["id"]:null;
    $name = isset($_GET["name"])?$_GET["name"]:null;
    $brand = isset($_GET["brand"])?$_GET["brand"]:null;
    $dizhi = isset($_GET["dizhi"])?$_GET["dizhi"]:null;
    $price = isset($_GET["price"])?$_GET["price"]:null;
    $qty = isset($_GET["qty"])?$_GET["qty"]:null;
    $imgurl = isset($_GET["imgurl"])?$_GET["imgurl"]:null;
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

    $res = $conn->query('insert into usergoods (uname,id,name,imgurl,brand,dizhi,price,qty) values ("'.$uname.'","'.$id.'","'.$imgurl.'","'.$name.'","'.$brand.'","'.$dizhi.'","'.$price.'","'.$qty.'")');
    if($res){
        echo "注册成功";
        }else{
        echo "注册失败";
    }
?>