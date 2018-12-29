jQuery(function($){
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

    var str = "";
    var qty = 5;
    var currentPage = 1;
        $.ajax({
            url: '../api/list.php',
            type: 'get',
            success :function(res){
                $.each(JSON.parse(res).data,function(idx,item){
                    str +=(`<li id="${item.id}">
                                <div>
                                    <img src="../${item.imgurl}" height="343" width="228" style="z-index: 1;}"/>
                                    <ul>
                                        <p>颜色:</p>
                                        <li>红色</li>
                                        <li>黑色</li>
                                        <li>黄色</li>
                                    </ul>
                                </div>
                                <p>
                                    <span>${item.brand}</span><br />
                                    <span>${item.name}</span><br />
                                    <span>￥${item.price}</span>

                                </p>
                        </li>`)
                    $("#output").html(`${str}`);
                    $(".jianshu").html(JSON.parse(res).data.length).css({"color":"red"});
                    $(".currentPage").html(JSON.parse(res).currentPage).css({"color":"red"});
                    $(".total").html(Math.ceil(JSON.parse(res).len/JSON.parse(res).qty));
                })
                var totalPage = Math.ceil(JSON.parse(res).len/JSON.parse(res).qty);
                    $(".page").html("");
                    for(var i=1;i<=totalPage;i++){
                        var $span = $("<span/>")

                        $span.html(i)
                        if(i == JSON.parse(res).currentPage){
                            $span.addClass("active");
                        }
                         $span.appendTo($(".page"))
                }
                var show = false;
                $(".bycost").on("click",function(){
                    var cost = true;
                    str="";
                    $(".page").html("");
                    $.ajax({
                    url: "../api/list.php?qty="+qty+"&currentPage="+currentPage+"&show="+show+"&cost="+cost,
                    type: 'get',
                    success :(res)=>{ 

                    $.each(JSON.parse(res).data,function(idx,item){
                        str +=(`<li id="${item.id}">
                                    <div>
                                        <img src="../${item.imgurl}" height="343" width="228"/>
                                        <ul>
                                            <p>颜色:</p>
                                            <li>红色</li>
                                            <li>黑色</li>
                                            <li>黄色</li>
                                        </ul>
                                    </div>
                                    <p>
                                        <span>${item.brand}</span><br />
                                        <span>${item.name}</span><br />
                                        <span>￥${item.price}</span>
                                    </p>
                            </li>`)
                        $("#output").html(`${str}`);
                        $(".jianshu").html(JSON.parse(res).data.length);
                        $(".currentPage").html(JSON.parse(res).currentPage);
                        $(".total").html(Math.ceil(JSON.parse(res).len/JSON.parse(res).qty));
                    })
                    var totalPage = Math.ceil(JSON.parse(res).len/JSON.parse(res).qty);
                    for(var i=1;i<=totalPage;i++){
                    var $span = $("<span/>")
                    $span.html(i)
                    if(i == JSON.parse(res).currentPage){
                        $span.addClass("active");
                    }
                     $span.appendTo($(".page"))
                    }
                    }
                })
                    show = !show;
                })
              $(".bytime").on("click",function(){
                    var time = true;
                    str="";
                            $(".page").html("");
                            $.ajax({
                            url: "../api/list.php?qty="+qty+"&currentPage="+currentPage+"&show="+show+"&time="+time,
                            type: 'get',
                            success :(res)=>{ 

                            $.each(JSON.parse(res).data,function(idx,item){
                                str +=(`<li id="${item.id}">
                                            <div>
                                                <img src="../${item.imgurl}" height="343" width="228"/>
                                                <ul>
                                                    <p>颜色:</p>
                                                    <li>红色</li>
                                                    <li>黑色</li>
                                                    <li>黄色</li>
                                                </ul>
                                            </div>
                                            <p>
                                                <span>${item.brand}</span><br />
                                                <span>${item.name}</span><br />
                                                <span>￥${item.price}</span>
                                            </p>
                                    </li>`)
                                $("#output").html(`${str}`);
                                $(".jianshu").html(JSON.parse(res).data.length);
                                $(".currentPage").html(JSON.parse(res).currentPage);
                                $(".total").html(Math.ceil(JSON.parse(res).len/JSON.parse(res).qty));
                            })
                            var totalPage = Math.ceil(JSON.parse(res).len/JSON.parse(res).qty);
                            for(var i=1;i<=totalPage;i++){
                            var $span = $("<span/>")
                            $span.html(i)
                            if(i == JSON.parse(res).currentPage){
                                $span.addClass("active");
                            }
                             $span.appendTo($(".page"))
                            }
                            }
                        })
                    show=!show;
                })
                $(".page").on("click","span",function(){
                    $(".page").html("");
                    str="";
                    currentPage = $(this).html();
                    rander();
                })
                $("#output").on("mouseover","li",function(){
                    $(this).css("border","1px solid pink");
                    $(this).find("ul").stop().animate({"top":263},500)

                })
                $("#output").on("mouseout","li",function(){
                    $(this).css("border","none");
                    $(this).find("ul").stop().animate({"top":343},500)
                })
            }
        });
        
  
    function rander(){
        $.ajax({
            url: "../api/list.php?qty="+qty+"&currentPage="+currentPage,
            type: 'get',
            success :(res)=>{ 

            $.each(JSON.parse(res).data,function(idx,item){
                str +=(`<li id="${item.id}">
                            <div>
                                <img src="../${item.imgurl}" height="343" width="228"/>
                                <ul>
                                    <p>颜色:</p>
                                    <li>红色</li>
                                    <li>黑色</li>
                                    <li>黄色</li>
                                </ul>
                            </div>
                            <p>
                                <span>${item.brand}</span><br />
                                <span>${item.name}</span><br />
                                <span>￥${item.price}</span>
                            </p>
                    </li>`)
                $("#output").html(`${str}`);
                $(".jianshu").html(JSON.parse(res).data.length);
                $(".currentPage").html(JSON.parse(res).currentPage);
                $(".total").html(Math.ceil(JSON.parse(res).len/JSON.parse(res).qty));
            })
            var totalPage = Math.ceil(JSON.parse(res).len/JSON.parse(res).qty);
            for(var i=1;i<=totalPage;i++){
            var $span = $("<span/>")
            $span.html(i)
            if(i == JSON.parse(res).currentPage){
                $span.addClass("active");
            }
             $span.appendTo($(".page"))
            }
            }
        })
    }

    $("#output").on("click","li",function(){
        location.href="../html/details.html?id="+($(this).attr("id"));
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
                    console.log($(".car"));
                $(".car").on("mouseover",function(){
                    $(this).css({"background":"#fff"});
                    $(".car_son").css({"display":"block"});
                })
                $(".car").on("mouseout",function(){
                    $(this).css({"background":"#333"});
                    $(".car_son").css({"display":"none"});
                })
                $(".car").on("click",function(){
                    location.href = "../html/shopcar.html";
                })
                 
            }    
        }); 
})