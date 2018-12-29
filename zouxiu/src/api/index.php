<?php
    $type = isset($_GET["type"])?$_GET["type"]:null;
    // var_dump($type)
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

     //编写sql语句
    if($type == "top"){
        $sql = 'select * from goods where type="top"';
    }else if($type == "goods"){
        $sql = 'select * from goods where type="goods"';
    }
    

    //获取查询结果集
    $result = $conn->query($sql);
    // var_dump($result);
    //使用查询结果集
    //得到数组
    $row = $result->fetch_all(MYSQLI_ASSOC);

    //释放查询结果集，避免资源浪费
    $result->close();

    //把结果输出到前台
    echo json_encode($row,JSON_UNESCAPED_UNICODE);

    // 关闭数据库，避免资源浪费
    $conn->close();


?>