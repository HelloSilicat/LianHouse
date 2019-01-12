function getQueryVariable(variable) {
    var query = window.location.search.subtoStringing(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
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

        alert("正在获取房源信息");

        var citys = new Array("北京","上海","广州");
        var pm = new Array("月","季","年");
        var ht = new Array("一居","二居","三局及以上");
        var rm = new Array("1000以下","1000~2000","2000~3000","3000以上");

        $.ajax({
            type:"GET",
            contentType:"application/x-www-form-urlencoded",
            url:"http://localhost:8090/h_item/h_get",
            data:{
                "id": house_id
            },
            xhrFields:{withCredentials:true},
            
            success:function(data){
                if(data.status == "success"){
                    alert("获取成功！");
                    $("#house_area").text(data.data[0]["area"]);
                    $("#house_cashPledge").text(data.data[0]["cashPledge"]);
                    $("#house_community").text(data.data[0]["community"]);
                    $("#house_city").text(data.data[0]["city"]);
                    if (data.data[0]["elevator"] == 1){
                        $("#house_elevator").text("有");
                    }
                    else{
                        $("#house_elevator").text("无");
                    }
                    $("#house_floor").text(data.data[0]["floor"]);
                    $("#house_house_description").text(data.data[0]["houseDescription"]);
                    $("#house_pic").attr("src",data.data[0]["housePic"])
                    $("#house_pay_method").text(data.data[0]["payMethod"]);
                    $("#house_house_type").text(data.data[0]["houseType"]);
                    $("house_name").text(data.data[0]["city"]+data.data[0]["community"]+data.data[0]["floor"]+"层房");
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


                   