jQuery(document).ready(function() {
    $("#login").on("click", function() {
        var telephone = $("#telephone").val();
        var password = $("#password").val();
        if (telephone == null || telephone == "") {
            alert("手机号不能为空");
            return false;
        }
        if (password == null || password == "") {
            alert("密码不能为空");
            return false;
        }

        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "http://localhost:8090/h_user/h_login",
            data: {
                "phone_number": telephone,
                "password": password
            },
            xhrFields: { withCredentials: true },
            success: function(data) {
                if (data.status == "success_login") {
                    alert("登录成功");
                    setTimeout(function() {
                        window.location.href = "index.html?user_login=1&user_id=" + data.data["id"];
                    }, 1000);
                } else {
                    alert("登录失败！" + data.data.errMsg);
                }
            },
            error: function(data) {
                alert("登录失败！" + data.responseText);
            }
        });
        return false;
    });

});
