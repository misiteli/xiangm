jQuery(function($){
    var type ;
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

//Top部分 AJAX请求数据
        type = "top";
        $.ajax({
            type: 'get',
            url: 'api/index.php?type='+type,
            success :function(res){
                // console.log(res);
                // var $res = res;
                var str = "";
                $.each(JSON.parse(res),function(idx,item){
                    // console.log(item)
                    
                    // console.log(title)
                    str +=(`<li id="${item.id}">
                                <a href="">
                                    <img src="${item.imgurl}" height="285" width="397">
                                </a>  
                            </li>`)
                    $(".output").html(`${str}`);
                })
                // 顶尖推荐动画
                    var $tupian = $(".top").find("img");
                    // console.log($tupian)
                    $tupian.on("mouseover",function(){
                        $(this).stop().animate({opacity:0.5},500)
                    })
                    $tupian.on("mouseout",function(){
                        $(this).stop().animate({opacity:1},500)
                    })
            }
        }); 
//Goods部分 AJAX请求数据
        type = "goods";
        $.ajax({
            url: 'api/index.php?type='+type,
            type: 'get',
            success :function(xxx){
                // var $res = res; 
                var str = "";
                $.each(JSON.parse(xxx),function(idx,item){
                    // console.log(item)
                    
                    // console.log(title)
                    str +=(`<li id="${item.id}" class="goods">
                                <div class="goods_bd_t">
                                    <img src="${item.imgurl}" />
                                </div>
                                <div class="goods_bd_b">
                                    <span class="span1">${item.brand}</span><br />
                                    <span class="span2">${item.name}</span><br />
                                    <span class="span3">￥${item.price}</span>
                                </div>
                            </li>`)
                    $("#goodslist").html(`${str}`);
                })
                // 发现好货动画
                    var $goods = $(".goods");
                    // console.log($goods)
                    $goods.on("mouseover",function(){
                        $(this).children("div").css({"border":"1px solid #000"})
                    })
                    $goods.on("mouseout",function(){
                        $(this).children("div").css({"border": "1px solid #ccc"})
                    })
            }    
        }); 
// 购物车渲染
         var uname = Cookie.getCookie("yonghu");
        $.ajax({
            url: 'api/shopcar.php?uname='+uname,
            type: 'get',
            success :function(xxx){
                // var $res = res; 
                var str = "";
                $.each(JSON.parse(xxx),function(idx,item){
                    // console.log(item)
                    // console.log(xxx);
                    // console.log(title)
                    str +=(`<li id="${item.id}" class="xx">
                    
                                    <img class="fl" src="${item.name}" width="50" height="72"/>
                    
                            
                                    <span class="span1">${item.brand}</span><br />
                                    <span class="span2">${item.imgurl}</span><br />
                                    <span class="span3">￥${item.price}</span><span>&times;${item.qty}</span>
                            
                            </li>`)
                    $(".car_son").html(`${str}`);
                })
                $(".car").on("mouseover",function(){
                    $(this).css({"background":"#fff"});
                    $(".car_son").css({"display":"block"});
                })
                $(".car").on("mouseout",function(){
                    $(this).css({"background":"#333"});
                    $(".car_son").css({"display":"none"});
                })
                $(".car").on("click",function(){
                    location.href = "html/shopcar.html";
                })
                 
            }    
        }); 


// 热门新品动画
    var $img = $(".hot").find("img");
    $img.on("mouseover",function(){
        $(this).stop().animate({width:630,height:315},500)
    })
    $img.on("mouseout",function(){
        $(this).stop().animate({width:600,height:300},500)
    })

// 热销新品动画
    var $img1 = $(".special").find("img");
     $img1.on("mouseover",function(){
        $(this).stop().animate({width:630,height:315},500)
    })
    $img1.on("mouseout",function(){
        $(this).stop().animate({width:600,height:300},500)
    })
// 跳转到指定位置
    var $tiao = $("#tiao");
    $tiao.on("click","li",function(){
        clearInterval(this.timer)
        this.timer = setInterval(()=>{
            var top = window.scrollY;
            top -= 500;
            if(top<=0){
                clearInterval(this.timer)
            }
            window.scrollBy(0,-1000);
        },100)
    })

    // 用户名
    if(Cookie.getCookie("yonghu") != ""){
        $(".denglu").html(Cookie.getCookie("yonghu"));
        var $a = $("<a/>");
        $a.prependTo($(".denglu")).html("[退出]").css({"padding-right": 10}).on("click",function(){
            Cookie.delCookie("yonghu","/");
            $(".denglu").attr("href","./../index.html");
        })
    }
    // else if(Cookie.getCookie("yonghu") == ""){
    //     $(".denglu").on("click","a",function(){
    //         $(".denglu").attr("href","html/denglu.html");
    //     })
        
    // }
})