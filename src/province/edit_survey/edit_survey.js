var json_data=[//服务器返回的数据
  {
    sy_list_id:'123',//主键
    title:'标题',//调查的标题
    instructions:'说明',//调查的说明
    data:[//具体内容
      {
        sy_question_id:'1231',//题目的id
        sy_list_id:'123',//所属问卷
        seq:'1',//题目的序号
        question:'您的性别？',
        value:'',//用户的答案
        type:'danxuan',//题目的类型，danxuan：单选，duoxuan：多选，tiankong：填空
        style:'horizontal',//horizontal：水平(一行多个)，vertical：竖直(一行一个)，none：填空不考虑(有且仅有一个输入框)
        options:[//选项
          '男','女'
        ]
      },
      {
        sy_question_id:'1232',//题目的id
        seq:'2',//题目的序号
        question:'您满意吗？',
        type:'duoxuan',//题目的类型，danxuan：单选，duoxuan：多选，tiankong：填空
        style:'horizontal',//horizontal：水平，vertical：竖直，none：填空不考虑
        options:[//选项
          '有待改善','非常满意','为人乐观','乐于助人'
        ]
      },
      {
        sy_question_id:'1233',//题目的id
        seq:'3',//题目的序号
        question:'您有什么意见？',
        type:'tiankong',//题目的类型，danxuan：单选，duoxuan：多选，tiankong：填空
        style:'none',//horizontal：水平，vertical：竖直，none：填空不考虑
        options:[//选项
          '我认为自己在近几个月来的工作中遇到了不少挑战，尽管已经在试着改善，但仍有不少工作都解决的不是很好，主要基于以下几个方面，同时也是希望自己今后需要好好改善的几个方面'
        ]
      },
    ]
  },
  {
    sy_list_id:'456',//主键
    title:'标题',//调查的标题
    instructions:'说明',//调查的说明
    data:[//具体内容
      {
        sy_question_id:'4561',//题目的id
        seq:'1',//题目的序号
        question:'您喜欢我们公司吗？',
        type:'danxuan',//题目的类型，danxuan：单选，duoxuan：多选，tiankong：填空
        style:'horizontal',//horizontal：水平，vertical：竖直，none：填空不考虑
        options:[//选项
          '喜欢','不喜欢'
        ]
      }
    ]
  },
];


var E = window.wangEditor;
var editor = new E('#div1');
//var num=0;//列表数
//var xuanze_type='danxuan';
var old_data=$.extend(true,{},json_data);//编辑前的数据,Object.assign去除关联性,只能从old_data改变
//var new_data;//新编辑的数据

// var app=new Vue({
//   el:'#app',
//   data:{
//     title:'您在日常生活中对从市场上购买的食品、农产品的质量安全感到放心吗？',
//     danxuans:'选项1',
//   }
// });
// var app2=new Vue({
//   el:'#app2',
//   data:{
//     title:'1345',
//     danxuans:'选项1',
//   }
// })

function xuanran(){
  //渲染模板
  var tp1 = document.getElementById('apps').innerHTML;
  //console.log(tp1);
  $('#app').html('');//清空原来的内容
  // var tp2 = document.getElementById('danxuans').innerHTML;
  for(var i=0;i<json_data[0].data.length;i++){
    $('#app').append(template(tp1,{
      seq:json_data[0].data[i].seq,
      question:json_data[0].data[i].question,
      options:json_data[0].data[i].options.length,
      xuanxiang:json_data[0].data[i].options,
      type:json_data[0].data[i].type,
    }));
  }
}

$(document).ready(function () {
  //渲染模板
 // num=json_data[0].data.length;
  xuanran();

  //说明框
  editor.customConfig.menus=[
    'head',//标题
    'bold',//粗体
    'fontSize',//字号
    'fontName',//字体
    'italic',//斜体
    'underline',//下划线
    'strikeThrough',//删除线
    'foreColor',//文字颜色
    'backColor',//背景颜色
    'link',//插入链接
    'list',//列表
    'justify',//对齐方式
    'emoticon',//表情
    'table',//表格
    'undo'//撤销
  ];
  editor.create();

});


$('.show_hidden').click(function () {
  if($(this).nextAll('ul').css('display')==='none'){
    $(this).nextAll('ul').css('display','block');
    $(this).find('i').removeClass('sanjiaoxing_you');
    $(this).find('i').addClass('sanjiaoxing_down');
  }

  else{
    $(this).nextAll('ul').css('display','none');
    $(this).find('i').removeClass('sanjiaoxing_down');
    $(this).find('i').addClass('sanjiaoxing_you');
  }

})

$('.title').mouseover(function () {
  $(this).tooltip({
    text:'点击可编辑',
    theme:'light'
  });
});

  new jBox('Modal',{
    attach:'.title',
    closeOnClick:false,
    closeButton: 'title',
    trigger:'click',
    title: "编辑标题和说明",
    content:$('#gridform'),
    width: 720,
    height: 350,
    position: {
      x: 'center',               // Horizontal position, use a number, 'left', 'right' or 'center'
      y: 'center'                // Vertical position, use a number, 'top', 'bottom' or 'center'
    },

  });


function title_edit() {

  alert('标题：'+document.getElementById('title_content').value+'\n'+'说明：'+editor.txt.html());
};
$('#app').on('mouseenter','.xuanxiang',function () {

  if($(this).find('.show_hidden_edit').css('display')==='block'){
    return;
  }

  $(this).find('.show_hidden_func').css('display', 'block')
});
$('#app').on('mouseleave','.xuanxiang',function () {
  if($(this).find('.show_hidden_edit').css('display')==='block'){
    return;
  }
    $(this).find('.show_hidden_func').css('display', 'none')
});

//渲染选项
function xuanran_item(obj) {
  //渲染选项模板
  var tmp= $(obj).parent().parent().parent().parent('.xuanxiang');
  var index=tmp.data('index');

 // console.log(index);
 //  var tp1 = document.getElementById('add_items').innerHTML;
 //  //console.log(tp1);
 //  $('#add_item_item').html('');//清空原来的内容
 //  // var tp2 = document.getElementById('danxuans').innerHTML;
 //  for(var i=0;i<json_data[0].data.length;i++){
 //    $('#add_item_item').append(template(tp1,{
 //      //seq:json_data[0].data[i].seq,
 //      //question:json_data[0].data[i].question,
 //      options_item:json_data[0].data[i].options.length,
 //      xuanxiang_item:json_data[0].data[i].options,
 //  //    type:json_data[0].data[i].type,
 //    }));
 //  }
}

//编辑按钮
function xuanxiangedit(obj) {
  if($(obj).parent().parent().parent().nextAll('.show_hidden_edit').css('display')==='block'){
    return;
  }
  $(obj).parent().parent().parent().nextAll('.show_hidden_edit').css('display', 'block')
  // var parent=$(obj).parent().parent().parent().parent('.xuanxiang');
  // var type=parent.data('type');

  //console.log(type);
  //xuanran_item(obj);
  // old_data=$(obj).parent().parent().nextAll();
  // console.log(old_data);
};
function quxiao_edit(obj) {
  json_data=$.extend(true,{},old_data);
  xuanran();
  $(obj).parent().parent('.show_hidden_edit').css('display', 'none')
};
function wancheng_edit(obj) {
  old_data=$.extend(true,{},json_data);
  xuanran();
  $(obj).parent().parent('.show_hidden_edit').css('display', 'none')
};
//增加选项
$('#app').on('click','#add_add',function () {
  var location=$(this).parent().parent().parent().parent().parent().find('#xuanxiang_item');
  var nodes_num=location.children().length+1;
  var nodes_type=location.data('type');
  var father_node=$(this).parent().parent().parent().parent().parent('.xuanxiang');
  //console.log(father_node);
  var list_index=father_node.data('index')-1;
  //console.log(list_index);
  //console.log(nodes_type);
  if(nodes_type==='danxuan'){
  var html='<p class="r" data-index="'+nodes_num+'" style="display: inline;"><input class="input_value" type="radio" name="radio<%=seq%>" value="选项" /><span class="radio">选项</span> </p>';
  location.append(html);
  }
  else if(nodes_type==='duoxuan'){
    var html='<p class="r" data-index="'+nodes_num+'" style="display: inline;"><input class="input_value" type="checkbox" name="checkbox<%=seq%>" value="选项" /><span class="radio">选项</span> </p>';
    location.append(html);
  }



  //location.append(' <%}%> <%if(xuanze_type==\'duoxuan\'){%> type="checkbox" name="checkbox<%=seq%>" <%}%>  ');
  //单选文本标题
  var label=$(this).parent().prev('#add_item_item');
 // console.log(label);
 var label_num= label.children().length+1;
 var label_html='<div class="muban" data-index="'+label_num+'"><input class="title_content2" type="text" value="选项" style="height: 34px;width: 250px;margin-top: 5px;"/><span onclick="delete_(this)" style="cursor: pointer;"> 删除</span></div>'
label.append(label_html);
//   var tmp=template(document.getElementById('add_items').innerHTML,{
// count:counts
//   });
//
//   var tmp1=$(this).parent().prev('#add_item_item').html();
//     //document.getElementById('add_item_item').innerHTML;
//   $(this).parent().prev('#add_item_item').html(tmp1+tmp);
//修改json_data数据
json_data[0].data[list_index].options.push('选项');
//console.log(json_data[0].data[list_index].options);
//单选按钮
//   var tmp3=template(document.getElementById('danxuans').innerHTML,{
//     count:counts++
//   });
//
//   var tmp4=$(this).parent().parent().parent().parent().prev('#app2').find('#xuanxiang_item').html();
//   $(this).parent().parent().parent().parent().prev('#app2').find('#xuanxiang_item').html(tmp4+tmp3);
//   var index_num=$(this).parent().parent().parent().parent().parent().data('index');
//   var tmptmp=$(this).next().find('.myselect').val();
//   var del= $(this).parent().parent().parent().parent().prev('#app2').find('#xuanxiang_item').find('.input_value');
//   if(tmptmp=='danxuan'){
//     del.attr('type','radio');
//   }
//   else if(tmptmp=='duoxuan'){
//     del.attr('type','checkbox');
//   }
//   // else if(tmptmp=='xialakuang'){
//   //   del.attr('type','checkbox');
//   // }
//
//   $(this).parent().parent().parent().parent().prev('#app2').find('#xuanxiang_item').find(".input_value").attr('name','radio'+index_num);
  //$(del[i]).find(".input_value").attr('name','radio'+);
});
//删除选项
function delete_(obj) {


  //console.log($(obj).parent().parent().parent().parent().parent().parent());
  var index=$(obj).parent().data('index');
  var del= $(obj).parent().parent().parent().parent().parent().parent().find(".r");
  var location=$(obj).parent().parent().parent().parent().parent().parent('.xuanxiang');
  var list_jindex=location.data('index')-1;
  var delete_index=index-1;
  for(var i=0;i<del.length;i++){
   if(del[i].getAttribute('data-index')==index){
     del[i].remove();
     break;
   }
 }
  $(obj).parent().remove();
//修改json_data数据
  json_data[0].data[list_jindex].options.splice(delete_index,1);
 // counts--;
};
//监听标题
$('#app').on('input propertychange','.title_content',function (e) {
  var location=$(this).parent().parent().parent().parent('.xuanxiang');
  var list_index=location.data('index')-1;
  $(this).parent().parent().parent().parent().find(".sp").html(e.target.value);
  json_data[0].data[list_index].question=e.target.value;
  // app2.$data.title=e.target.value;
});
//监听选项
$('#app').on('input propertychange','.title_content2',function (e) {
  //e.target.value=$(this).val();
  var location=$(this).parent().parent().parent().parent().parent().parent('.xuanxiang');
  var list_index=location.data('index')-1;
  $(this).attr('value',$(this).val());
  var index=$(this).parent().data('index');
  var option_index=index-1;
  var del= $(this).parent().parent().parent().parent().parent().parent().find(".r");
  for(var i=0;i<del.length;i++){
    if(del[i].getAttribute('data-index')==index){
      $(del[i]).find(".radio").html(e.target.value);
      $(del[i]).find(".input_value").attr('value',e.target.value);
      break;
    }
  }
  json_data[0].data[list_index].options[option_index]=e.target.value;
 // $(this).parent().parent().parent().parent().parent().parent().find(".radio").html(e.target.value);
});
function add_xuanxiang(type) {
 var num1=json_data[0].data.length;
  num1++;
  var newdata={
    sy_question_id:'1231',//题目的id
    sy_list_id:'123',//所属问卷
    seq:num1,//题目的序号
    question:'请编辑问题？',
    value:'',//用户的答案
    type:type,//题目的类型，danxuan：单选，duoxuan：多选，tiankong：填空
    style:'horizontal',//horizontal：水平(一行多个)，vertical：竖直(一行一个)，none：填空不考虑(有且仅有一个输入框)
    options:[//选项
      type=='tiankong'?'填空':'选项',
    ]
  };
  json_data[0].data.push(newdata);
  xuanran();
  // var tmp=template(document.getElementById('apps').innerHTML,{
  //   count:counts++
  // });
  //
  // var tmp1=document.getElementById('app').innerHTML;
  //
  // //tmp=document.createTextNode(tmp);
  //
  // document.getElementById('app').innerHTML=tmp1+tmp;
};
//改变选择题类型
function change_type(obj) {
  var del= $(obj).parent().parent().parent().parent().parent().parent().find('#xuanxiang_item').find('.input_value');
  if($(obj).val()=='danxuan'){
    del.attr('type','radio');
  }
  else if($(obj).val()=='duoxuan'){
    del.attr('type','checkbox');
  }
  // else if($(obj).val()=='xialakuang'){
  //   del.attr('type','checkbox');
  // }
  //var location=$(obj).parent()
};
//改变排列方向
function change_fangxiang(obj) {
  var del= $(obj).parent().parent().parent().parent().parent().parent().find('#xuanxiang_item').find('.r');
  if($(obj).val()=='horizontal'){
    del.css('display','inline')
  }
  else if($(obj).val()=='vertical') {
    del.css('display','block')
  }

}
//移动
function moveup(obj) {
 var tmp= $(obj).parent().parent().parent().parent('.xuanxiang');
 var index=tmp.data('index');
 if(index===1){
   alert('到顶了');
   return;
 }
 var tmp1,tmp_index;
  tmp_index=index;
  tmp_index--;
  var index1=index-1;
  var tmp_index1=tmp_index-1;
  json_data[0].data[index1].seq=tmp_index;
  json_data[0].data[tmp_index1].seq=index;
  tmp1=json_data[0].data[index1];
  json_data[0].data[index1]=json_data[0].data[tmp_index1];
  json_data[0].data[tmp_index1]=tmp1;
  //console.log(json_data);
  xuanran();

}
function movedown(obj) {
  var tmp= $(obj).parent().parent().parent().parent('.xuanxiang');
  var index=tmp.data('index');
  var num1=json_data[0].data.length;
  if(index===num1){
    alert('到底了');
    return;
  }
  var tmp1,tmp_index;
  tmp_index=index;
  tmp_index++;
  var index1=index-1;
  var tmp_index1=tmp_index-1;
  json_data[0].data[index1].seq=tmp_index;
  json_data[0].data[tmp_index1].seq=index;
  tmp1=json_data[0].data[index1];
  json_data[0].data[index1]=json_data[0].data[tmp_index1];
  json_data[0].data[tmp_index1]=tmp1;
  //console.log(json_data);
  xuanran();

}
function deletes(obj) {
  LG.showConfirm('确定删除此项吗？','删除确认',function confirm(confirm) {
    if(confirm) {
      var tmp = $(obj).parent().parent().parent().parent('.xuanxiang');
      var index = tmp.data('index');
      var index1 = index - 1;
      //delete json_data[0].data[index1];
      json_data[0].data.splice(index1, 1);
      //重新排序
      for (var i = index1; i < json_data[0].data.length; i++) {
        json_data[0].data[i].seq = index;
        index++;
      }
      xuanran();
      LG.tip("删除成功");
    }
  })

}
