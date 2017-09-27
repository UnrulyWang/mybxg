/**
 * Created by Administrator on 2017/9/25.
 */
define(['jquery','template','util','bootstrap','form'],function($,template,util){
    //设置导航菜单选中
    util.getLightHigh('/course/add');
    //获取id
    var csId=util.getId('cs_id');
    //获取所有的课时
    $.ajax({
        url:'/api/course/lesson',
        type:'get',
        data:{cs_id:csId},
        dataType:'json',
        success:function(data){
            console.log(data);
            if(data.code==200){
                var html=template('lessonTpl',data.result);
                $('#lessonInfo').html(html);
                //点击添加课时操作
                $('#addLesson').click(function(){
                    var html=template('modalTpl',{ operate:'添加课时'});
                    $('#chapterModal').html(html);
                    $('#chapterModal').modal();
                    //点击添加按钮 处理添加课时的表单提交
                  $('#addLesson2').on('click',function(){
                      $('#lessonForm').ajaxSubmit({
                          type:'post',
                          url:'/api/course/chapter/add',
                          data:{ct_cs_id:csId},
                          dataType:'json',
                          success:function(data){
                              if(data.code==200){
                                  location.reload();
                              }
                          }
                      });
                  })
                });
                //处理编辑课时操作
                $('.editLesson').click(function(){
                    //得到ct_id
                    var ctId=$(this).attr('data-ctId');
                    $.ajax({
                        type:'get',
                        url:'/api/course/chapter/edit',
                        data:{ct_id:ctId},
                        dataType: 'json',
                         success:function(data){
                                data.result.operate='编辑课时';
                             var html=template('modalTpl',data.result);
                             $('#chapterModal').html(html);
                             $('#chapterModal').modal();
                             //处理编辑课时的表单提交
                             $('#addLesson2').on('click',function(){
                                 $('#lessonForm').ajaxSubmit({
                                     type:'post',
                                     url:'/api/course/chapter/modify',
                                     data:{ct_cs_id:csId,ct_id:ctId},
                                     dataType:'json',
                                     success:function(data){
                                         if(data.code==200){
                                             location.reload();
                                         }
                                     }
                                 });
                             })
                         }
                    });

                });
                //处理添加和编辑讲师的表单提交
                //$()
            }
        }
    })
});