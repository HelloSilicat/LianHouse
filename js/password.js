jQuery(document).ready(function () {
    $("#confirm").on("click",function(){
        var old_password = $("#input1").val();
        var new_password = $("#input2").val();
        var rep_password = $("#input3").val();
        
        var myDate = new Date();
        year = myDate.getFullYear();
        month = myDate.getMonth()+1;
        day=myDate.getDate();
        var current_time = year+","+month+","+day;
        
        if (old_password == null || old_password == "" ||
            new_password == null || new_password == "" ||
            rep_password == null || rep_password == "")  {
            alert("请输入密码！");
            return false;
        }                
        if (new_password != rep_password) {
            alert("两次密码输入不一致，请重新输入。");
            document.getElementById("input1").reset();
            document.getElementById("input2").reset();
            document.getElementById("input3").reset();
            
            return false;
        }
        
        var send_data = {"password_N": new_password, "password_O": old_password, "modify_time": current_time};
        console.log(send_data);
        
        if (new_password.length <= 6 || new_password.length >= 20) {
            alert("密码长度不合理(应在6和20之间)");
            document.getElementById("input1").reset();
            document.getElementById("input2").reset();
            document.getElementById("input3").reset();
            
            return false;
        }
        else {
            $.ajax({
                type:"POST",
                contentType:"application/x-www-form-urlencoded",
                url:"http://localhost:8090/h_user/h_information_modify",
                data: send_data,
                xhrFields:{withCredentials: true},
                success: function(data){
                    if(data.status == "success"){
                        alert("修改成功");
                    }else{
                        alert("修改失败，原因为"+data.data.errMsg);
                    }
                },
                error: function (data) {
                    alert("修改失败，原因为"+data.responseText);
                }
            });
        }
    return false;
    });
});
