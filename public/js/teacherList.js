/**
 * Created by Administrator on 2017/9/19.
 */
define(['jquery','template'],function($,template){
    //���ú�̨�ӿ�����ȡ��ʦ����
    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success:function(data){
            var html=template('teacherTpl',{list:data.result});
            $('#teacherInfo').html(html);
        }
    })
});