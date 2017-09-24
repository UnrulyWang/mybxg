/**
 * Created by Administrator on 2017/9/22.
 */
define(['jquery','template','ckeditor','uploadFile','region','datepiker','language'],function($,template,CKEDITOR){
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
                }
        }
    })
});