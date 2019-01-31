function getQueryVariable(variable) {
    var query = window.location.search.subtoStringing(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
function getStrMonth(mon) {
    if (mon < 1 || mon > 12) {
        mon = 1;
    }
    var temp = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
    return temp[mon -1];
}

jQuery(document).ready(function () {
    window.onload = function() {
        var current_url = location.href;
        var user_status = getQueryVariable("user_login")

        if (user_status != "1") {
          location.href="404.html";
        }
        
        var user_id=getQueryVariable("user_id");
        var house_id=getQueryVariable("house_id");

        /*var T = "12,3,5";
        alert(T.split(','))
        alert(T.split(',')[0])
        var date = new Date();
        alert(date.getFullYear());*/

        //alert("正在获取房源信息");
    

        var citys = new Array("北京","上海","广州");
        var pm = new Array("月","季","年");
        var ht = new Array("一居","二居","三局及以上");
        var rm = new Array("1000以下","1000~2000","2000~3000","3000以上");

        $.ajax({
            type:"GET",
            contentType:"application/x-www-form-urlencoded",
            url:"http://localhost:8090/h_item/h_list",
            data:{
                "id": house_id
            },
            xhrFields:{withCredentials:true},
            
            success:function(data){
                if(data.status == "success"){
                    var dataArray = data.data;
                    var final_cons = "";
                    for (var i = 0; i < dataArray.length; i++) {
                        D = dataArray[i];
                        var year = D["registerTime"].split(',')[0];
                        var month = D["registerTime"].split(',')[1];
                        month = parseInt(month);
                        month = getStrMonth(month);
                        var day = D["registerTime"].split(',')[2];
                        var pic_url = D["housePic"];
                        var city = D["city"];
                        var community = D["community"];
                        var rentMoney = D["rentMoney"];
                        var floor = D["floor"];
                        var houseType = D["houseType"];
                        var url = "details.html?user_login="+user_status;
                        url += "&user_id="+user_id;
                        url += "&house_id="+D["id"];

                        var cons = "<div class='swiper-slide'><div class='single-post'>";
                        cons += "<ul class='post-date text-center m-0 p-0 list-unstyled'>";
                        cons += "<li><span>"+month+"/<span>"+day+"</li>";
                        cons += "<li>"+year+"</li>";
                        cons += "</ul>";
                        //cons += "<img style='width: 400;height: 200;opacity:0.5;z-index:-2;'  alt='' src='"+'images/bg.png'+"' />";
                        cons += "<img style='width: 100%;height: 100%;z-index:-1;'  alt='' src='"+pic_url+"' />";
                        cons += "<div class='post-content'";
                        cons += "<h2 class='h4'>"
                        cons += city+community;
                        cons += "</h2>";
                        cons += "<ul class='post-meta nav'>";
                        cons += "<li>"+"￥"+rentMoney+"</li>";
                        cons += "<li>"+"楼层："+floor+"</li>";
                        cons += "<li>"+"房屋类型："+houseType+"</li>";
                        cons += "</ul>";
                        cons += "<hr />"
                        cons += "<a class='btn btn-transparent' href='"+url+"'>"+"查看更多"+"</a>"
                        cons +="</div></div></div>";
                        final_cons += cons;
                    }
                    $("#best_house").html($(final_cons));

                }else{
                    alert("获取失败!"+data.data.errMsg);
                }
            },
            error:function (data) {
                alert("获取失败！"+data.responseText);
            }

        });   
        return false;
    }
});


                   