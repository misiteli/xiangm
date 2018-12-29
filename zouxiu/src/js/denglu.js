jQuery(function($){
    var $uname = $(".uname");
    var $mima = $(".mima");
    var $btn = $(".btn");
    // 提交插入数据库
    $btn.on("click",function(){
        if($.trim($(".uname").val())!=""){
             $.ajax({
                type: "get",
                url: "../api/denglu.php?uname="+$uname.val()+"&mima="+$mima.val(),
                success : function(res){
                    
                    if(res == "登陆成功"){
                        var date = new Date();
                        date.setDate(date.getDate() + 10);
                        Cookie.setCookie("yonghu",$uname.val(),date,"/")
                        location.href="../index.html";
                        
                        
                   }
                }
            })
        }
        
    })
// var arr = Cookie.getCookie("yonghu");

// console.log(arr);





})