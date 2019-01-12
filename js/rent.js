

jQuery(document).ready(function () {
    $("#rent").on("click",function(){
        var cash_pledge = $("#cash_pledge").val();
        var rent_money = $("#rent_money").val();
        var city = $('#city').val();
        var comm = $('#comm').val();
        var building_id = $("#building_id").val();
        var area = $("#area").val();
        var floor = $("#floor").val();
        var house_description = $("#house_description").val();
        var house_pic = "http://pic.ziroom.com/house_images/g2m1/M00/D6/BC/v800x600_ChAFBluvRESAB54oAAPio8Fp7vY089.jpg";
        
        var myDate = new Date();
        var register_time = myDate.toLocaleTimeString();
        var id = getQueryVariable("user_id");
        var pay_method;
        var radio = document.getElementById("pay_ratio");
        radio = radio.getElementsByTagName("label");
        for (i=0; i<radio.length; i++){
            if (radio[i].getAttribute("aria-checked")) {
                pay_method = i;
            }
        }
        names= new Array("月","季","年");
        pay_method = names[pay_method];
        
        var house_type;
        var radio = document.getElementById("type_ratio");
        radio = radio.getElementsByTagName("label");
        for (i=0; i<radio.length; i++){
            if (radio[i].getAttribute("aria-checked")) {
                house_type = i;
            }
        }
        names= new Array("一居","二居","三居及以上");
        house_type = names[house_type];
        
        var elevator;
        var radio = document.getElementById("elevator_ratio");
        radio = radio.getElementsByTagName("label");
        for (i=0; i<radio.length; i++){
            if (radio[i].getAttribute("aria-checked")) {
                elevator = i;
            }
        }
        
        
        
        if(city == null || city == ""){
            alert("请选择房源区域！");
            return false;
        }
        if(comm == null || comm == ""){
            alert("请填写小区名！");
            return false;
        }
        if (building_id == null || building_id == "") {
            alert("请填写楼号！");
            return false;
        }
        
        
        $.ajax({
            type:"POST",
            contentType:"application/x-www-form-urlencoded",
            url:"http://localhost:8090/h_create",
            data:{
                "elevator": elevator,
                "cash_pledge": cash_pledge,
                "pay_method": pay_method,
                "rent_money": rent_money,
                "city": city,
                "community": comm,
                "building_id": building_id,
                "house_type": house_type,
                "area": area,
                "floor": floor,
                "house_description": house_description,
                "house_pic": house_pic,
                "register_time": register_time
            },
            xhrFields:{withCredentials:true},
            success:function(data){
                if(data.status == "success"){
                    alert("发布成功");
                    setTimeout(function(){
                        window.location.href="/profile/index.html?user_login=1&user_id="+str(id);
                    },1000);
                    
                }else{
                    alert("发布失败，原因为"+data.data.errMsg);
                }
            },
            error:function (data) {
                alert("发布失败，原因为"+data.responseText);
            }
        });
        return false;
    });
});