jQuery(document).ready(function () {
    function getValidId(data, rent_money) {
        var valid_num = 0;
        var valid_id = new Array();
        for (var i=0; i < data.length; i++) {
            var flag = true;
            if (rent_money == 0 && data[i]["rentMoney"] > 1000) {
                flag = false;
            }
            else if (rent_money == 1 && (data[i]["rentMoney"] < 1000 || data[i]["rentMoney"] > 2000)) {
                flag = false;
            }
            else if (rent_money == 2 && (data[i]["rentMoney"] < 2000 || data[i]["rentMoney"] > 3000)) {
                flag = false;
            }
            else if (rent_money == 3 && (data[i]["rentMoney"] < 3000)) {
                flag = false;
            }
            if (flag) {
                valid_id[valid_num] = i;
                valid_num++;
            }
        }
        return valid_id;
    }
    window.onload = function() {
        alert("nihao");
        var current_url = location.href;
        var user_status = getQueryVariable("user_login")

        if (user_status != "1") {
          location.href="404.html";
      }
      alert("Hello SB");

      var city=getQueryVariable("city");
      var pay_method=getQueryVariable("pay_method");
      var community=getQueryVariable("community");
      var house_type=getQueryVariable("house_type");
      var floor=getQueryVariable("floor");
      var elevator=getQueryVariable("elevator");
      var rent_money=getQueryVariable("rent_money");
      var user_id=getQueryVariable("user_id");

      var citys = new Array("北京","上海","广州");
      var pm = new Array("月","季","年");
      var ht = new Array("一居","二居","三局及以上");
      var rm = new Array("1000以下","1000~2000","2000~3000","3000以上");

      var debug_info = "房源区域为："+citys[city]+"\n";
      debug_info += "支付方式为："+pm[pay_method]+"\n";
      debug_info += "小区名称为："+community+"\n";
      debug_info += "房屋类型为："+ht[house_type]+"\n";
      debug_info += "楼层为："+floor+"\n";
      debug_info += "电梯情况为："+elevator+"\n";
      debug_info += "租金范围为："+rm[rent_money]+"\n";
      debug_info += "当前用户为："+user_id+"\n";

      alert(debug_info);

      $.ajax({
        type:"GET",
        contentType:"application/x-www-form-urlencoded",
        url:"http://localhost:8090/h_item/h_search",
        data:{
            "elevator": elevator,
            "pay_method": pm[pay_method],
            "city": citys[city],
            "community": community,
            "house_type": ht[house_type],
            "floor": floor
        },
        xhrFields:{withCredentials:true},
        success:function(data){
            if(data.status == "success"){
                alert("查询成功");
                valid_id = getValidId(data.data, rent_money);
                ids="";
                for (var i=0; i<valid_id.length; i++) {
                    ids+=toString(valid_id[i])+",";
                }
                alert("满足要求的房屋Id为："+ids);
                show_id = valid_id[0]
    $("#id").text(data.data[show_id]["buildingId"]);
    $("#cashPledge").text(data.data[show_id]["cashPledge"]);
    $("#city").text(data.data[show_id]["city"]);
    $("#community").text(data.data[show_id]["community"]);
            }else{
                alert("查询失败!"+data.data.errMsg);
            }
        },
        error:function (data) {
            alert("查询失败!"+data.responseText);
        }
    });   

    

    return false;
  }
});