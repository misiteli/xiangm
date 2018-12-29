jQuery(function($){
    var $uname = $(".uname");
    var $mima = $(".mima");
    var $word = $(".word");
    var $btn = $(".btn");
    // 注册 用户名存在判断
    // $uname.on("blur",function(){
    //      if($.trim($(".uname").val())==""){
    //             $(".yonghu").html("请输入用户名");
    //         }else{
    //             $(".yonghu").html(res);
    //         }
    //     $.ajax({
    //         type: "get",
    //         url: "../api/zhuce.php?uname="+$uname.val(),
    //         success : function(res){
    //            console.log(res);
                    
                
    //         }
    //     })
    // })
$uname.on("blur",function(){
         if($.trim($(".uname").val())==""){
                $(".yonghu").html("请输入用户名");
            }else{
                $.ajax({
                    type: "get",
                    url: "../api/zhuce.php?uname="+$uname.val(),
                    success : function(res){
                     console.log(res);
                     if(res=="该用户名已被注册"){
                        $(".yonghu").html("该用户名已被注册");
                     }else if(res=="该用户名可用"){
                        $(".yonghu").html("该用户名可用");
                     }
                }
            })
        
        }
    })
 $.idcode.setCode();
    // 提交插入数据库
    $btn.on("click",function(){
        var register = true;
       
        var IsBy = $.idcode.validateCode(); 
        if(IsBy == true){
            $.ajax({
                type: "get",
                url: "../api/zhuce.php?uname="+$uname.val()+"&mima="+$mima.val()+"&register="+register+"&word="+$word.val(),
                success : function(res){
                    if($word.val() == $mima.val()){
                        alert(res)
                        location.href="denglu.html"
                    }else if($word.val() != $mima.val()){
                        alert("两次密码不一致")
                    }  
                }
            })
        }
        // alert(IsBy);
        
    })







})