var json_data=[
  {
    sy_list_id:'123',//主键
    title:'和平县创建“广东省质量强县示范县” 质量满意度调查问卷',//调查的标题
    instructions:' 尊敬的女士、先生：\n' +
      '\n' +
      '您好！您所在的和平县正在创建“广东省质量强县示范县”，我们受和平县创建广东省质量强县示范县工作领导小组办公室的委托，对和平县2017和2018年质量满意度进行调查，以了解和平县的质量状况水平，占用您几分钟时间问几个问题，请根据您的切身感受，在相应的空格位置打√。\n' +
      '\n' +
      '涉及到的个人信息相关内容，我们将严格为您保密。谢谢！\n' +
      '\n' +
      '我们的访问要求回答者年龄在18岁以上，您符合这个条件吗？（ ）\n' +
      '\n' +
      '注：符合者请继续填写以下内容，不符合者不必填写。',//调查的说明
    data:[//具体内容
      {
        sy_question_id:'1231',//题目的id
        seq:'1',//题目的序号
        question:'您喜欢我们公司吗？',
        value:'',//用户的答案
        type:'danxuan',//题目的类型，danxuan：单选，duoxuan：多选，tiankong：填空
        style:'horizontal',//horizontal：水平，vertical：竖直，none：填空不考虑
        options:[//选项
          '喜欢','不喜欢'
        ]
      }
    ]
  },
  {
    sy_list_id:'456',//主键
    title:'第二个问卷调查',//调查的标题
    instructions:' 尊敬的女士、先生：\n' +
      '\n' +
      '您好！您所在的和平县正在创建“广东省质量强县示范县”，我们受和平县创建广东省质量强县示范县工作领导小组办公室的委托，对和平县2017和2018年质量满意度进行调查，以了解和平县的质量状况水平，占用您几分钟时间问几个问题，请根据您的切身感受，在相应的空格位置打√。\n' +
      '\n' +
      '涉及到的个人信息相关内容，我们将严格为您保密。谢谢！\n' +
      '\n' +
      '我们的访问要求回答者年龄在18岁以上，您符合这个条件吗？（ ）\n' +
      '\n' +
      '注：符合者请继续填写以下内容，不符合者不必填写。',//调查的说明
    data:[//具体内容
      {
        sy_question_id:'4561',//题目的id
        seq:'1',//题目的序号
        question:'您喜欢我们公司吗？',
        value:'',//用户的答案
        type:'danxuan',//题目的类型，danxuan：单选，duoxuan：多选，tiankong：填空
        style:'horizontal',//horizontal：水平，vertical：竖直，none：填空不考虑
        options:[//选项
          '喜欢','不喜欢'
        ]
      }
    ]
  },
];

$(document).ready(function () {
//渲染模板
  var tp1 = document.getElementById('mymubans').innerHTML;
  // var tp2 = document.getElementById('danxuans').innerHTML;
  for(var i=0;i<json_data.length;i++){
    $('#mymuban').append(template(tp1,{
      title:json_data[i].title,
      instructions:json_data[i].instructions,
    }));
  }
});

function creat_btn() {
  window.location.href="../creat_survey/creat_survey.html"
}
$('#mymuban').on('click','.edit',function () {
  window.location.href="../edit_survey/edit_survey.html"
});
//全部问卷
function search_all_btn() {
  $.ajax({
    url:'http://182.61.26.241:8081/api/queryAllPaper',
    type:'get',
    accept: "application/json;charset=UTF-8",
    dataType: "JSONP",
    data:{},
    //JSON.stringify
    success: function (data) {
      if (data) {
        console.log(data)
      } },
    error: function () {
      console.log('错误')
    }
  })
}
