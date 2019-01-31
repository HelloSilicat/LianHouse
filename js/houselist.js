var element = layui.element;
var table = layui.table;
var form = layui.form;

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

var citys = new Array("北京", "上海", "广州");
var pm = new Array("月", "季", "年");
var ht = new Array("一居", "二居", "三居及以上");
var rm = new Array("1000以下", "1000~2000", "2000~3000", "3000以上");
var city = getQueryVariable("city");
var pay_method = getQueryVariable("pay_method");
var community = getQueryVariable("community");
var house_type = getQueryVariable("house_type");
var floor = getQueryVariable("floor");
var elevator = getQueryVariable("elevator");
var rent_money = getQueryVariable("rent_money");
var user_id = getQueryVariable("user_id");
var current_url = location.href;
var user_status = getQueryVariable("user_login");
var user_login=getQueryVariable("user_login"), user_id=getQueryVariable("user_id");
baseURL = "details.html?user_login="+user_login+"&user_id="+user_id;


function link(idx) {
    var id = getQueryVariable("user_id");
    old_href = document.getElementById("add" + idx).href;
    old_href = old_href + "?user_login=1&user_id=" + id;
    document.getElementById("add" + idx).href = old_href;
}

function getValidId(data, rent_money) {
    var valid_num = 0;
    var valid_id = new Array();
    for (var i = 0; i < data.length; i++) {
        var flag = true;
        if (rent_money == 0 && data[i]["rentMoney"] > 1000) {
            flag = false;
        } else if (rent_money == 1 && (data[i]["rentMoney"] < 1000 || data[i]["rentMoney"] > 2000)) {
            flag = false;
        } else if (rent_money == 2 && (data[i]["rentMoney"] < 2000 || data[i]["rentMoney"] > 3000)) {
            flag = false;
        } else if (rent_money == 3 && (data[i]["rentMoney"] < 3000)) {
            flag = false;
        }
        if (flag) {
            valid_id[valid_num] = i;
            valid_num++;
        }
    }
    return valid_id;
}

var myKey = new Array("id", "area", "cashPledge", "elevator", "payMethod", "rentMoney", "city", "community", "houseType", "floor");
function draw(myData) {
  //展示已知数据
  console.log(myData);
  table.render({
    elem: '#record',
    cols: [[
      {field: 'id', title: '房屋ID', width: 80, sort: true},
      {field: 'area', title: '房屋面积', width: 80, sort: false},
      {field: 'cashPledge', title: '押金月数', width: 100, sort: true},
      {field: 'city', title: '所在区域', minWidth: 100},
      {field: 'community', title: '小区名称', minWidth: 100},
      {field: 'elevator', title: '电梯情况', minWidth: 100},
      {field: 'floor', title: '楼层', minWidth: 100},
      {field: 'houseType', title: '房屋类型', minWidth: 100},
      {field: 'payMethod', title: '支付方式', minWidth: 100},
      {field: 'rentMoney', title: '每月租金', minWidth: 100},
      {field: 'more', title: '', minWidth: 100},
    ]],
    data: myData, 
    skin: 'line', //表格风格,
    even: true,
    page: true, //是否显示分页
    limits: [5, 7, 10],
    limit: 5, //每页默认显示的数量
  });
}


jQuery(document).ready(function() {
    if (user_status != "1") {
        location.href = "404.html";
    }

    var debug_info = "房源区域为：" + citys[city] + "\n";
    debug_info += "支付方式为：" + pm[pay_method] + "\n";
    debug_info += "小区名称为：" + community + "\n";
    debug_info += "房屋类型为：" + ht[house_type] + "\n";
    debug_info += "楼层为：" + floor + "\n";
    debug_info += "电梯情况为：" + elevator + "\n";
    debug_info += "租金范围为：" + rm[rent_money] + "\n";
    debug_info += "当前用户为：" + user_id + "\n";
    console.log(debug_info);

    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "http://localhost:8090/h_item/h_search",
        data: {
            "elevator": elevator,
            "pay_method": pm[pay_method],
            "city": citys[city],
            "community": community,
            "house_type": ht[house_type],
            "floor": floor
        },
        xhrFields: { withCredentials: true },
        success: function(data) {
            if (data.status == "success") {
                console.log("查询成功");
                console.log(data.data);
                valid_id = getValidId(data.data, rent_money);
                var myData = new Array();
                for (var i = 0; i < valid_id.length; i++) {
                    temp_data = data.data[valid_id[i]];
                    temp_dic = {}
                    for (var j = 0; j < myKey.length; j++) {
                      temp_dic[myKey[j]] = temp_data[myKey[j]];
                    }
                    button = "<button class='layui-btn layui=btn=normal' onclick='javascript:window.location.href=\""+baseURL+"&house_id="+temp_dic["id"]+"\"'>查看更多</a></button>";
          
                    temp_dic["more"] = button;
                    myData.push(temp_dic);
                }
                draw(myData);
            } 
            else {
                alert("查询失败!" + data.data.errMsg);
            }
        },
        error: function(data) {
            alert("查询失败!" + data.responseText);
        }
    });
    return false;

});