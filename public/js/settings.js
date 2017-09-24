/**
 * Created by Administrator on 2017/9/22.
 */
define(['jquery','template','ckeditor','util','uploadFile','region','datepicker','language','validate','form'],function($,template,CKEDITOR,util){
    util.getLightHigh('/teacher/list');
    $.ajax({
        url:'/api/teacher/profile',
        dataType:'json',
        type:'get',
        success:function(data){
                if(data.code==200){
                    var html=template('personTpl',data.result);
                    $('#personInfo').html(html);
                    console.log(5);
                    //处理头像
                    //$('#upfile').uploadify({
                    //    width:120,
                    //    height:120,
                    //    buttonText:'',
                    //    itemTemplate:'<span></span>',
                    //    swf:'/public/assets/uploadFile/uploadify.swf',
                    //    uploader: '/api/uploader/avatar',
                    //    fileObjName: 'tc_avatar',
                    //    onUploadSuccess:function(a,b){
                    //        console.log(1)
                    //        //把字符串转化成对象
                    //        var obj=JSON.parse(b);
                    //       $('.preview img').attr('src',obj.result.path);
                    //    }
                    //});
                    $("#upfile").uploadify({
                        width:120,
                        height:120,
                        buttonText:'',
                        swf:'/public/assets/uploadFile/uploadify.swf',
                        uploader:'/api/uploader/avatar',
                        fileObjName:'tc_avatar',
                        onUploadSuccess:function(a,b){
                            console.log(b);
                            var obj = JSON.parse(b);
                            $(".preview img").attr('src',obj.result.path);

                        }
                    });
                    //三级联动
                    $('#pcd').region({
                        url:'/public/assets/jquery-region/region.json'

                    })
                    //处理富文本
                    CKEDITOR.replace('editor',{
                        toolbarGroups : [
                            { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
                        ]
                    })
                    //处理表单提交
                    $('#settingForm').validate({
                        sendForm:false,
                        valid:function(){
                            //上传的户籍信息拼接
                            var homeTown='';
                            var p=$('#p').find('option:selected').text();
                           var c= $('#c').find('option:selected').text();
                            var d=$('#d').find('option:selected').text();
                            homeTown=p+'|'+c+'|'+d;
                            //更新富文本内容
                            for(var instance in CKEDITOR.instances){
                                CKEDITOR.instances[instance].updateElement();
                            }
                            //这是提交表单
                            $(this).ajaxSubmit({
                                url:'/api/teacher/modify',
                                dataType:'json',
                                type:'post',
                                data:{tc_hometown:homeTown},
                                success:function(data){
                                    console.log(data);
                                    if(data.code==200){
                                        location.reload();
                                    }
                                }
                            });
                        }
                    })
                }
        }
    })
});