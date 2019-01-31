jQuery(document).ready(function () {
    $("#wanted").on("click",function(){
        var city=$("#city").val();
        var community=$("#community").val();
        var house_type=$("#house_type").val();
        var floor=$("#floor").val();
        var cash_pledge=$("#cash_pledge").val();
        var elevator=$("#elevator").val();
        var pay_method=$("#pay_method").val();
        var rent_money=$("#rent_money").val();
        var house_description=$("#house_description").val();
        var myDate = new Date();
        year = myDate.getFullYear();
        month = myDate.getMonth()+1;
        day=myDate.getDate();
        var current_time = year+","+month+","+day;
        var current_id = getQueryVariable("user_id");
        var register_time = current_time

        if (elevator == "有") {
            elevator = 1;
        }
        else {
            elevator = 0;
        }

        /*if (pay_method == "月") {
            pay_method == 
        }
        if (pay_method == "季") {
            pay_method == 1;
        }
        if (pay_method == "年") {
            pay_method == 2;
        }*/



        var debugInfo = "city="+city+"\n";
        debugInfo += "community="+community+"\n";
        debugInfo += "house_type="+house_type+"\n";
        debugInfo += "floor="+floor+"\n";
        debugInfo += "cash_pledge="+cash_pledge+"\n";
        debugInfo += "elevator="+elevator+"\n";
        debugInfo += "pay_method="+pay_method+"\n";
        debugInfo += "rent_money="+rent_money+"\n";
        debugInfo += "house_description="+house_description+"\n";
        debugInfo += "register_time="+register_time+"\n";
        debugInfo += "current_id="+current_id;

        console.log(debugInfo)
        
        $.ajax({
            type:"POST",
            contentType:"application/x-www-form-urlencoded",
            url:"http://localhost:8090/h_askhouse/h_askcreate",
            data:{
                "elevator": parseInt(elevator),
                "cash_pledge": cash_pledge,
                "pay_method": pay_method,
                "rent_money": parseInt(rent_money),
                "city": city,
                "community": community,
                "house_type": house_type,
                "floor": parseInt(floor),
                "house_description": house_description,
                "register_time": register_time
            },
            xhrFields:{withCredentials:true},
            success:function(data){
                if(data.status == "success"){
                    alert("求租成功");   
                }else{
                    alert("求租失败"+data.data.errMsg);
                }
            },
            error:function (data) {
                alert("求租失败"+data.responseText);
            }
        });
        return false;
    });
});