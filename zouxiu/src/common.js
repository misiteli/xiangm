
// 吸顶菜单
    xiding();
   function xiding(){
        window.onscroll = function(){
            $search = $(".header_t");
                if(window.scrollY>100){
                    $search.css({"position":"fixed","top":0,"background":"#333333","z-index":100})
                }else{
                    $search.css({"position":"static"})
                }
        }
   }
   
   
// 封装cookie的设置、获取、删除
var Cookie = {
    // 设置cookie
    //  * name cookie名
    //  * val cookie值
    //  * date 时间对象
    //  * path 路径
    setCookie : function(name,val,date,path){
        var str = name+"="+val;
        if(date){
            str += "; expires="+date.toUTCString();
        }
        if(path){
            str += "; path="+path;
        }
        document.cookie = str;
    },
    // 获取cookie
    getCookie : function(name){
        var cookie = document.cookie;//"left=300; age=17"   
        if(cookie == ""){
            return "";
        }else{
            var cookieArr = cookie.split("; ");
            // var res = "";
            // cookieArr.forEach(function(item){
            //     var arr = item.split("=");
            //     if(arr[0] == name){
            //         res =  arr[1];
            //     }
            // })
            // return res;
            for(var i=0;i<cookieArr.length;i++){
                var arr = cookieArr[i].split("=");
                if(arr[0] == name){
                    return arr[1];
                }
            }
            return "";
        }
    },
    // 删除某条cookie
    delCookie : function(name,path){
        var d = new Date();
        d.setDate(d.getDate()-1);
        Cookie.setCookie(name,"",d,path);
    }
    
}



   
