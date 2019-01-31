jQuery(document).ready(function () {
    $("#getotp").on("click",function(){
        var telphone = $("#telephone").val();
        if(telphone == null || telphone == ""){
            alert("手机号不能为空");
            return false;
        }
        $.ajax({
            type:"POST",
            contentType:"application/x-www-form-urlencoded",
            url:"http://localhost:8090/h_user/h_getotp",
            data:{
                "phone_number":$("#telephone").val(),
            },
            xhrFields:{withCredentials:true},
            success:function(data){
                if(data.status == "success"){
                    alert("验证码已经发送到了你的手机上，请注意查收");
                }else{
                    alert("验证码发送失败，原因为"+data.data.errMsg);
                }
            },
            error:function (data) {
                alert("验证码发送失败，原因为"+data.responseText);
            }
        });
        return false;
    });
    
    
    $("#register").on("click",function(){
        var telephone = $("#telephone").val();
        var password = $("#password").val();
        var name = $("#name").val();
        var nickname = $("#nickname").val();
        var verify_number = $("#verify_number").val();
        var otpCode = $("#otpCode").val();
        var city = $("#city").val();
        
        var myDate = new Date();
        year = myDate.getFullYear();
        month = myDate.getMonth()+1;
        day=myDate.getDate();
        var current_time = year+","+month+","+day;
        
        var verify_type=$("#select_id").val();
        
        if (verify_type == "身份证" && verify_number.length != 18) {
            alert("证件号输入错误！");
            document.getElementById("verify_number").reset();
        }
        
         if (password.length <= 6 || password.length >= 20) {
            alert("密码长度不合理(应在6和20之间)");
            document.getElementById("password").reset();
            
            return false;
        }
        
        if(telephone == null || telephone == ""){
            alert("手机号不能为空");
            return false;
        }
        if(nickname == null || nickname == ""){
            alert("昵称不能为空");
            return false;
        }
        if(name == null || name == ""){
            alert("姓名不能为空");
            return false;
        }
        if (verify_number == null || verify_number == "") {
            alert("证件号不能为空");
            return false;
        }
        if (verify_type == null || verify_type == "") {
            alert("证件类型不能为空");
            return false;
        }
        if (password == null || password == ""){
            alert("密码不能为空");
            return false;
        }
        if (otpCode == null || otpCode == ""){
            alert("验证码不能为空");
            return false;
        }
        if (city == null || city == ""){
            alert("城市不能为空");
            return false;
        }
        
        

        $.ajax({
            type:"POST",
            contentType:"application/x-www-form-urlencoded",
            url:"http://localhost:8090/h_user/h_register",
            data:{
                "phone_number":$("#telephone").val(),
                "password":password,
                "otpCode":otpCode,
                "user_alias":nickname,
                "verify_type":verify_type,
                "verify_number":verify_number,
                "reigister_city":city,
                "user_name":name,
                "register_time":current_time
            },
            xhrFields:{withCredentials:true},
            success:function(data){
                if(data.status == "success"){
                    alert("注册成功");
                    setTimeout(function(){
                        window.location.href="login.html";
                    },1000);
                    
                }else{
                    alert("注册失败!"+data.data.errMsg);
                }
            },
            error:function (data) {
                alert("注册失败!"+data.responseText);
            }
        });
        return false;
    });
});