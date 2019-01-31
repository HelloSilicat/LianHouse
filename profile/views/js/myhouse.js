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

function mydelete(idx) {
  if (confirm("确定删除吗？")) {
    var data = {'house_id':$("#delete"+idx).attr("name")};
    $.ajax({
      type:"POST",
      contentType:"application/x-www-form-urlencoded",
      url:"http://localhost:8090/h_item/h_delete",
      data:data,
      xhrFields:{withCredentials:true},
      success:function(data){
        if (data.status == "success") {
          alert("成功删除！");
          window.location.reload();
        }
        else {
          alert("删除失败！"+data.data.errMsg);
        }
      },
      error:function (data) {
        alert("删除失败！"+data.responseText);
      }
    });
  }
  return false;
};
var user_login=getQueryVariable("user_login"), user_id=getQueryVariable("user_id");
baseURL = "subview/morehouse.html?user_login="+user_login+"&user_id="+user_id;
var myKey = new Array("id", "city", "community", "buildingId", "floor");

function draw(myData) {
  //展示已知数据
  table.render({
    elem: '#record',
    cols: [[
      {field: 'id', title: '房屋ID', width: 80, sort: true},
      {field: 'city', title: '区域', width: 100, sort: false},
      {field: 'community', title: '小区名', minWidth: 100},
      {field: 'floor', title: '楼层', minWidth: 100},
      {field: 'buildingId', title: '楼号', minWidth: 100},
      {field: 'details', title: '', width: 180},
      {field: 'delete', title: '', width: 180}
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
    type:"GET",
    contentType:"application/x-www-form-urlencoded",
    url:"http://localhost:8090/h_item/h_user_show",
    data:data,
    xhrFields:{withCredentials:true},
    success:function(data){
      if (data.status == "success") {
        tempData = data.data;
        var myData = [];
        for (var i = 0; i < tempData.length; i++) {
          temp_dic = {}
          for (var j = 0; j < myKey.length; j++) {
            temp_dic[myKey[j]] = tempData[i][myKey[j]];
          }  
          temp_dic["details"] = "<button class='layui-btn layui=btn=normal' onclick='javascript:window.location.href=\""+baseURL+"&house_id="+temp_dic["id"]+"\"'>查看更多</a></button>";
          //alert(temp_dic["details"]);
          temp_dic["delete"] = "<button class='layui-btn layui-btn-danger' id='delete"+i+"' onclick=\"mydelete('"+i+"')\" name='"+temp_dic["id"]+"'>点击删除</button>";
          myData.push(temp_dic);
        }
        draw(myData);
      }
      else {
        alert("获取信息失败！"+data.data.errMsg);
      }
    },
    error:function (data) {
      alert("获取信息失败！"+data.responseText);
    }
  });
})

  
