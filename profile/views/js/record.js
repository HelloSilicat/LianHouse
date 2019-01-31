var element = layui.element;
var table = layui.table;
var form = layui.form;

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
 
var user_login=getQueryVariable("user_login"), user_id=getQueryVariable("user_id");
baseURL = "subview/morerent.html?user_login="+user_login+"&user_id="+user_id;
var myKey = new Array("id","houseId","ownerId","clientId","date","cashPledge","payMethod","startTime","totalTime",
                      "rentMonth", "ownerAgency", "clientAgency");

function myaccept(idx) {
  if (confirm("确认接受吗？")) {
    var data = {'id':$("#accept"+idx).attr("name"), 'state':1};
    $.ajax({
      type:"POST",
      contentType:"application/x-www-form-urlencoded",
      url:"http://localhost:8090/houseorder/affirmhouseorder",
      data:data,
      xhrFields:{withCredentials:true},
      success:function(data){
        if (data.status == "success") {
          alert("操作成功！");
          window.location.reload();
        }
        else {
          alert("操作失败！"+data.data.errMsg);
        }
      },
      error:function (data) {
        alert("操作失败！"+data.responseText);
      }
    });
  }
  return false;
}

function myrefuse(idx) {
  if (confirm("确认拒绝吗？")) {
    var data = {'id':$("#refuse"+idx).attr("name"), 'state':0};
    $.ajax({
      type:"POST",
      contentType:"application/x-www-form-urlencoded",
      url:"http://localhost:8090/houseorder/affirmhouseorder",
      data:data,
      xhrFields:{withCredentials:true},
      success:function(data){
        if (data.status == "success") {
          alert("操作成功！");
          window.location.reload();
        }
        else {
          alert("操作失败！"+data.data.errMsg);
        }
      },
      error:function (data) {
        alert("操作失败！"+data.responseText);
      }
    });
  }
  return false;
}

function mycancel(idx) {
  if (confirm("确认拒绝吗？")) {
    var data = {'id':$("#cancel"+idx).attr("name"), 'state':0};
    $.ajax({
      type:"POST",
      contentType:"application/x-www-form-urlencoded",
      url:"http://localhost:8090/houseorder/affirmhouseorder",
      data:data,
      xhrFields:{withCredentials:true},
      success:function(data){
        if (data.status == "success") {
          alert("操作成功！");
          window.location.reload();
        }
        else {
          alert("操作失败！"+data.data.errMsg);
        }
      },
      error:function (data) {
        alert("操作失败！"+data.responseText);
      }
    });
  }
  return false;
}

function draw(myData) {
  //展示已知数据
  console.log(myData);
  table.render({
    elem: '#record',
    cols: [[
      {field: 'id', title: '订单ID', width: 80, sort: true},
      {field: 'houseId', title: '房屋ID', width: 80, sort: false},
      {field: 'ownerId', title: '房东ID', width: 100, sort: true},
      {field: 'clientId', title: '租户ID', minWidth: 100},
      {field: 'date', title: '订单时间', minWidth: 100},
      {field: 'cashPledge', title: '押金月数', minWidth: 100},
      {field: 'payMethod', title: '支付方式', minWidth: 100},
      {field: 'startTime', title: '预定时间', minWidth: 100},
      {field: 'totalTime', title: '预定时长', minWidth: 100},
      {field: 'rentMonth', title: '每月租金', minWidth: 100},
      {field: 'ownerAgency', title: '手续费(房东)', minWidth: 100},
      {field: 'clientAgency', title: '手续费(租户)', minWidth: 100},
      {field: 'state', title: '订单状态', minWidth: 100},
      {field: 'button1', title: '', width: 70},
      {field: 'button2', title: '', width: 70},
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
  var data = {'user_id':user_id};
  $.ajax({
    type:"POST",
    contentType:"application/x-www-form-urlencoded",
    url:"http://localhost:8090/houseorder/searchhouseorder",      //change！！！
    data:data,
    xhrFields:{withCredentials:true},
    success:function(data){
      console.log(data.data);
      if (data.status == "success") {
        tempData = data.data;
        var myData = new Array();
        for (var i = 0; i < tempData.length; i++) {
          temp_dic = {}
          for (var j = 0; j < myKey.length; j++) {
            temp_dic[myKey[j]] = tempData[i][myKey[j]];
          } 
          temp_dic["state"] = "已完成";
          if (tempData[i]["ownerAgency"] == 0) {
            temp_dic["state"] = "未完成";
          }

          temp_dic["totalTime"] += "月";
          var mybutton1 = "";
          var mybutton2 = "";
          if (temp_dic["state"] == "未完成") {
            console.log(user_id)
            console.log(temp_dic["ownerId"])
            console.log(temp_dic["clientId"])
            if (user_id == temp_dic["ownerId"]) {
              mybutton1 = "<button class='layui-btn layui-btn' id='accept"+i+"' onclick=\"myaccept('"+i+"')\" name='"+temp_dic["id"]+"'>接受</button>";
              mybutton2 = "<button class='layui-btn layui-btn-danger' id='refuse"+i+"' onclick=\"myrefuse('"+i+"')\" name='"+temp_dic["id"]+"'>拒绝</button>";
            }
            else if (user_id == temp_dic["clientId"]) {
              mybutton1 = "<button class='layui-btn layui-btn-danger' id='cancel"+i+"' onclick=\"mycancel('"+i+"')\" name='"+temp_dic["id"]+"'>取消</button>";
            }
          }
          temp_dic["button1"] = mybutton1;
          temp_dic["button2"] = mybutton2;
        
          myData.push(temp_dic);
        }
        draw(myData);
      }
      else {
        alert("获取订单失败！"+data.data.errMsg);
      }
    },
    error:function (data) {
      alert("获取订单失败！"+data.responseText);
    }
  });

})

  
