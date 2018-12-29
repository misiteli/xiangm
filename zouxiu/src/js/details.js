$(function() {
    // 三级导航
    var $bao = $(".l1");
    $bao.on("mouseover",function(){
        for(var i=1;i<=$bao.length;i++){
            $(this).find("div").css("left",-i*"45")
        }
        $(this).find("div").removeClass().css({"z-index":2});
        $(this).find("p").css({"background":"#fff","border": "1px solid #CCC","border-bottom": "none"})           
                  ;      
    })
    $bao.on("mouseout",function(){
        $(this).find("div").addClass("bao");
        $(this).find("p").css({"background":"#F7F7F7","border": "none"})

    })

    var magnifierConfig = {
        magnifier : "#magnifier1",//最外层的大容器
        width : 500,//承载容器宽
        height : 500,//承载容器高
        moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
        zoom : 5//缩放比例
    };

   

    /*magnifier的内置函数调用*/
    /*
        //设置magnifier函数的index属性
        _magnifier.setIndex(1);

        //重新载入主图,根据magnifier函数的index属性
        _magnifier.eqImg();
    */
   

   // 倒计时===========================================================
    var countDown = document.getElementById("countDown");
    var d = new Date("2019/11/15 16:33:00");
    endTime();
    var timer = setInterval(endTime, 1000)
    function endTime(){
            var now = new Date();
            // 2. 获取之间相差的毫秒数/1000=>秒
            var offset = parseInt((d.getTime() - now.getTime())/1000);
            var seconds = offset%60;
            var minute = parseInt(offset/60)%60;//65分钟：1小时5分钟
            var hour = parseInt(offset/60/60)%24;//25小时：1天1小时
            var tian = parseInt(offset/60/60/24);
            
            countDown.innerHTML = tian+"天"+hour+"小时"+minute+"分钟"+seconds+"秒";
    }

    // 接收数据=========================================================
    var lujing = decodeURI(location.search.slice(1));
    var id = lujing.split("=")[1];
    // console.log(id);
    $.ajax({
        url: "../api/details.php?id="+id,
        type: "get",
        success: function(res){
            var row = JSON.parse(res)
            // console.log(row);
            $(".tupian").html('<img src="../'+row[0].imgurl+'"/>')
            $(".name").html(""+row[0].name+"");
            $(".pinpai").html(""+row[0].brand+"");
            $(".jiaqian").html("￥"+row[0].price+"");
            $(".save").html("￥"+row[0].save+"");
            $(".dizhi").html(""+row[0].dizhi+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;预计7-14个工作日送达");
             var _magnifier = magnifier(magnifierConfig);
             $(".buy").on("click",function(){
                location.href = "../html/shopcar.html";
             })
// ==================================================================
             // 动画之飞入购物车
           
            $(".scar").on("click",function(e){
                 var $img = $(".tupian").find("img")[1];
                $(document).css({"position":"relative"});
                var img1 = $img.cloneNode();
                var x = window.clientX-e.clientX+25;
                var y = e.clientY-25;
            $(img1).css({"width":50,"height":50,"position":"fixed","left":x,"top":y}).appendTo($(".scar")).animate({right:70,top:430,height:0,width:0},1000);
               
            })
            // 将用户和和商品一起存入数据库=====================
            $(".scar").on("click",function(){
                // console.log(row)
                if(Cookie.getCookie("yonghu") != ""){
                    var yonghu = Cookie.getCookie("yonghu");
                    var qty = $(".qty").val();
                    // var register = true;
                    console.log(row[0].name);
                    $.ajax({
                        url: "../api/detail_yonghu.php?uname="+yonghu+"&name="+row[0].name+"&brand="+row[0].brand+"&price="+row[0].save+"&dizhi="+row[0].dizhi+"&qty="+qty+"&id="+row[0].id+"&imgurl="+row[0].imgurl,
                        type: "get",
                        success: function(res){
                            console.log(res)
                        }
                    })
                }else{
                    alert("请先登录")
                    location.href = "../html/denglu.html"
                }
            })
        }
    })
    // 购物车渲染
         var uname = Cookie.getCookie("yonghu");
        $.ajax({
            url: '../api/shopcar.php?uname='+uname,
            type: 'get',
            success :function(xxx){
                // var $res = res; 
                var str = "";
                $.each(JSON.parse(xxx),function(idx,item){
                    // console.log(item)
                    // console.log(xxx);
                    // console.log(title)
                    str +=(`<li id="${item.id}" class="xx">
                    
                                    <img class="fl" src="../${item.name}" width="50" height="72"/>
                    
                            
                                    <span class="span1">${item.brand}</span><br />
                                    <span class="span2">${item.imgurl}</span><br />
                                    <span class="span3">￥${item.price}</span><span>&times;${item.qty}</span>
                            
                            </li>`)
                    $(".car_son").html(`${str}`);
                })
                $(".car").on("mouseover",".car>li",function(){
                    $(this).css({"background":"#fff"});
                    $(".car_son").css({"display":"block"});
                })
                $(".car").on("mouseout",".car>li",function(){
                    $(this).css({"background":"#333"});
                    $(".car_son").css({"display":"none"});
                })
                $(".car").on("click",function(){
                    location.href = "../html/shopcar.html";
                })
                 
            }    
        }); 
    // 跳转顶部==============================================
    var $totop = $(".totop");
    $totop.on("click",function(){
        clearInterval(this.timer)
        this.timer = setInterval(()=>{
            var top = window.scrollY;
            top -= 500;
            if(top<=0){
                clearInterval(this.timer)
            }
            window.scrollBy(0,-500);
        },200)
    })
    // 关闭右边栏========================================================
    var tiao = document.getElementsByClassName("tiao")[0];
    $(".close").on("click",function(){
        $("#tiao")[0].removeChild(tiao);
    })
    $(".tiao").on("mouseover","li",function(){
        $(this).css({"background":"orangered"})
    }).on("mouseout","li",function(){
        $(this).css({"background":"#333"})
    })
    // 用户名
    if(Cookie.getCookie("yonghu") != ""){
        $(".denglu").html(Cookie.getCookie("yonghu"));
        var $a = $("<a/>");
        $a.prependTo($(".denglu")).html("[退出]").css({"padding-right": 10}).on("click",function(){
            Cookie.delCookie("yonghu","/");
            $(".denglu").attr("href","../html/list.html");
        })
    }

})