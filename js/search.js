  function getQueryVariable(variable)
  {
     var query = window.location.search.subtoStringing(1);
     var vars = query.split("&");
     for (var i=0;i<vars.length;i++) {
       var pair = vars[i].split("=");
       if(pair[0] == variable){return pair[1];}
   }
   return(false);
}
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
                valid_id[valid_num] = data[i]["buildingId"];
                valid_num++;
            }
        }
        return valid_id;
    }
    $("#search").on("click",function(){
        var city = $("#city1 option:selected").val();
        var pay_method = $("#pay_method1 option:selected").val();
        var community = $("#community1").val();
        var house_type = $("#house_type1 option:selected").val();
        var floor = $("#floor1").val();
        var elevator = $("#elevator1 option:selected").val();
        var rent_money = $("#rent_money1 option:selected").val();
        var user_id = getQueryVariable("user_id");

        var debug_info = "房源区域为："+city+"\n";
        debug_info += "支付方式为："+pay_method+"\n";
        debug_info += "小区名称为："+community+"\n";
        debug_info += "房屋类型为："+house_type+"\n";
        debug_info += "楼层为："+floor+"\n";
        debug_info += "电梯情况为："+elevator+"\n";
        debug_info += "租金范围为："+rent_money+"\n";
        debug_info += "当前用户为："+user_id+"\n";

        alert(debug_info);

        var appendInfo = "city="+city+"&";
        appendInfo += "pay_method="+pay_method+"&";
        appendInfo += "community="+community+"&";
        appendInfo += "house_type="+house_type+"&";
        appendInfo += "floor="+floor+"&";
        appendInfo += "elevator="+elevator+"&";
        appendInfo += "rent_money="+rent_money+"&";
        appendInfo += "user_id="+user_id;

        alert(appendInfo)

        window.location.href="houselist.html?user_login=1&"+appendInfo;
        return false;
    });
});