<?php
    $uname = isset($_GET["uname"])?$_GET["uname"]:null;
    $mima = isset($_GET["mima"])?$_GET["mima"]:null;
    $register = isset($_GET["register"])?$_GET["register"]:null;
    $word = isset($_GET["word"])?$_GET["word"]:null;

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
    $res = $conn->query('select * from yonghu where uname="'.$uname.'"');
    if($res->num_rows > 0){
        echo "该用户名已被注册";
    }else{
        if($register && ($mima == $word)){
            $res = $conn->query('insert into yonghu (uname,mima) values ("'.$uname.'","'.$mima.'")');
            if($res){
                echo "注册成功";
            }else{
                echo "注册失败";
            }   
        }else{
            echo "该用户名可用";
        }
    }
?>