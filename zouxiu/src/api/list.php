<?php
    $qty = isset($_GET["qty"])? $_GET["qty"]: 5;
    $currentPage = isset($_GET["currentPage"])? $_GET["currentPage"]: 1;
    $cost = isset($_GET["cost"])? $_GET["cost"]: null;
    $time = isset($_GET["time"])? $_GET["time"]: null;
    $show = isset($_GET["show"])? $_GET["show"]: null;
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
    if($cost == "true"){
        if($show == "true"){
        $sql = 'select * from goods where type="goods" order by price';
        }else if($show == "false"){
            $sql = 'select * from goods where type="goods" order by price desc';
        }
    }else if($time == "true"){
        if($show == "true"){
        $sql = 'select * from goods where type="goods" order by time';
        }else if($show == "false"){
            $sql = 'select * from goods where type="goods" order by time desc';
        }
    }else{
        $sql = 'select * from goods where type="goods"';
    }
    

    //获取查询结果集
    $result = $conn->query($sql);
    // var_dump($result);
    //使用查询结果集
    //得到数组
    $row = $result->fetch_all(MYSQLI_ASSOC);
// var_dump($row);
    //释放查询结果集，避免资源浪费
    $result->close();

    // .将json字符串转成数组（获取数组的长度）,裁剪出需要的当前页的内容。
    // var_dump($row)
    // $row = json_decode($content,true);
    $len = count($row);
    $data = array_slice($row,($currentPage-1)*$qty,$qty);
    $row = array(
        "data" => $data,
        "len" => $len,
        "qty" => $qty,
        "currentPage" => $currentPage
    );

    //把结果输出到前台
    echo json_encode($row,JSON_UNESCAPED_UNICODE);

    // 关闭数据库，避免资源浪费
    // $conn->close();


?>