function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

var citys = new Array("北京", "上海", "广州");
var dic_elevator = new Array("无", "有");
var pm = new Array("月", "季", "年");
var ht = new Array("一居", "二居", "三居及以上");
var myKey = new Array("area", "floor", "cashPledge", "city", "houseType", "community", "payMethod", "elevator", "houseDescription", "rentMoney");

function link(idx) {
    var id = getQueryVariable("user_id");
    old_href = document.getElementById("add" + idx).href;
    var user_status = getQueryVariable("user_login")
    old_href = old_href + "?user_login=" + user_status + "&user_id=" + id;
    document.getElementById("add" + idx).href = old_href;
}


jQuery(document).ready(function() {
    var current_url = location.href;
    var user_status = getQueryVariable("user_login")
    var user_id = getQueryVariable("user_id");
    var house_id = getQueryVariable("house_id");

    if (user_status != "1") {
        location.href = "404.html";
    }

    if (user_status == "1") {
        document.getElementById("li1").style.display = "inline";
        document.getElementById("li2").style.display = "inline";
        document.getElementById("li3").style.display = "inline";
    } else {
        document.getElementById("li4").style.display = "inline";
        document.getElementById("li5").style.display = "inline";
    }

    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "http://localhost:8090/h_item/h_get",
        data: {"house_id": house_id},
        xhrFields: { withCredentials: true},
        success: function(data) {
            if (data.status == "success") {
                console.log("获取成功");
                console.log(data.data)

                for (var i = 0; i < myKey.length; i++) {
                    value = data.data[myKey[i]];
                    if (myKey[i] == "elevator") {
                        value = dic_elevator[parseInt(value)];
                    }
                    $("#" + myKey[i]).text(value);
                }

                $("#big_house_name").text(data.data["city"] + data.data["community"]+"房");
                $("#big_area").text(data.data["area"]);
                $("#big_floor").text(data.data["floor"]);
                $("#big_house_type").text(data.data["houseType"]);
            } else {
                alert("获取失败!" + data.data.errMsg);
            }
        },
        error: function(data) {
            alert("获取失败！" + data.responseText);
        }

    });

    $("#buy").on("click", function() {
        var myTime = $("#time").val();
        if (myTime == "") {
            alert("请输入求租范围！");
            return false;
        }

        var myDate = new Date();
        year = myDate.getFullYear();
        month = myDate.getMonth() + 1;
        day = myDate.getDate();
        var current_time = year + "," + month + "," + day;

        var start_time = myTime.split(" - ")[0];
        var end_time = myTime.split(" - ")[1];

        var start_year = start_time.split("-")[0],
            start_month = start_time.split("-")[1];
        var end_year = end_time.split("-")[0],
            end_month = end_time.split("-")[1];

        var interval = 0;
        if (start_year == end_year) {
            interval = parseInt(end_month) - parseInt(start_month);
        } else {
            interval = 12 * (parseInt(end_year) - parseInt(start_year) - 1);
            interval = interval + 12 - parseInt(start_month);
            interval = interval + parseInt(end_month);
        }

        var send_data = {};
        send_data["houseId"] = house_id;
        send_data["total_month"] = interval;
        send_data["start_time"] = start_year+","+start_month;
        send_data["time"] = current_time;
        console.log(send_data);

        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "http://localhost:8090/houseorder/createhouseorder",
            data: send_data,
            xhrFields: { withCredentials: true},
            success: function(data) {
                if (data.status == "success") {
                    console.log("预定成功");
                    alert("预定成功");
                    console.log(data.data)
                } else {
                    alert("预定失败!" + data.data.errMsg);
                }
            },
            error: function(data) {
                alert("预定失败！" + data.responseText);
            }

        });


        return false;
    })
    return false;
});