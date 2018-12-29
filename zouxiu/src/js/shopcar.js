jQuery(function($){
   
    // 请求数据==============================
    var uname = Cookie.getCookie("yonghu");
    $.ajax({
        url: '../api/shopcar.php?uname='+uname,
        type: 'get',
        success: function(res){
            var str = "";
            var total = 0;
            var row = JSON.parse(res);
            $.each(row,function(idx,item){
            var price = item.price*item.qty;
            // total += price;
            str+=   `<tr>
                        <td width="80"><input class="other" type="checkbox" name="check"></td>
                        <td width="10">#</td>
                        <td width="460">
                            <div>
                                <img src="../${item.name}" height="82" width="62"/>
                                <span>${item.imgurl}</span><br />
                                <span>${item.brand}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发货地：${item.dizhi}</span><br />
                                <span>颜色：黄色</span><br />
                            </div>
                        </td>
                        <td width="120" class="qian">${price}</td>
                        <td width="140">
                            
                            <span class="txt">${item.qty}</span>
                            
                        </td>
                        <td class="shan" width="140"><span>删除</span></td>
                    </tr>`
                    $("#output").html(str);
                    $(".shan").on("click",function(){
                            var qian = $(this).closest("tr").find($(".qian")).html()
                                // var uname = Cookie.getCookie("yonghu");
                            var shan = true;    
                                $.ajax({
                                    url: '../api/shopshanchu.php?uname='+uname+'&price='+qian+'&shan='+shan,
                                    type: 'get',
                                    success: function(res){
                                         location.href = "../html/shopcar.html"
                                    }
                                })
                                
                        })
                     // 全选=================================
                        var $allList = $("#all");
                        var $otherList = $("tbody tr");
                        var $datalist = $("#datalist");
                        var $trs = $(".datalist tbody tr");
                        $allList.on("click",function(){
                            $otherList.find(":checkbox").prop("checked",this.checked);
                                    if(this.checked == true){
                                        $otherList.addClass("selected");
                                        for(let i = 0;i<row.length;i++){
                                            total += $($(".other").closest("tr")[i]).find($(".txt")).html()*$($(".other").closest("tr")[i]).find($(".qian")).html();
                                         $(".total").html("￥"+total/row.length)
                                        }
                                    }else{
                                        $otherList.removeClass("selected");
                                         for(let i = 0;i<row.length;i++){
                                            total -= $($(".other").closest("tr")[i]).find($(".txt")).html()*$($(".other").closest("tr")[i]).find($(".qian")).html();
                                         $(".total").html("￥"+total/row.length)
                                        }
                                    } 
                        })
                        
                        
                                // 3.点击单行任意位置，切换高亮(切换类名)，根据类名是否存在设置多选框的状态
                        $(".other").on("click",function(){
                            $(this).closest("tr").toggleClass("selected");
                            $(this).closest("tr").find(":checkbox").prop("checked",$(this).closest("tr").hasClass("selected"));
                            all();
                            if($(this).closest("tr").find(":checkbox").prop("checked")){
                                         var ss = $(".total").html();
                                         // console.log(ss.splice(1));
                                         // console.log(ss.slice(1));
                                         var total = Number(ss.slice(1));
                                total += Number($(this).closest("tr").find($(".txt")).html()*$(this).closest("tr").find($(".qian")).html());
                                // total += price;
                                // console.log(total);
                                $(".total").html("￥"+total)
                            }else if(!$(this).closest("tr").find(":checkbox").prop("checked")){
                                         var ss = $(".total").html();
                                         // console.log(ss.splice(1));
                                         // console.log(ss.slice(1));
                                         var total = ss.slice(1)
                                total -= $(this).closest("tr").find($(".txt")).html()*$(this).closest("tr").find($(".qian")).html();
                                // total += price;
                                // console.log(total);
                                $(".total").html("￥"+total)
                            }
                        function all(){
                            var $checkedLen = $otherList.find(":checked").length;
                            var $listLen = $otherList.length;
                            if($checkedLen == $listLen){
                                $allList.prop("checked",true);
                            }else{
                                $allList.prop("checked",false);
                            }
                        }

                    })
            })
             
        }
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