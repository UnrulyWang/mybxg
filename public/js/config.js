/**
 * Created by Administrator on 2017/9/19.
 */
require.config({
    baseUrl:'/public/assets',
    paths:{
        jquery: 'jquery/jquery.min',
        template:'artTemplate/template-web',
        bootstrap:'bootstrap/js/bootstrap',
        datepicker:'bootstrap-datepicker/js/bootstrap-datepicker',
        language:'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        common: '../js/common',
        cookie: 'jquery-cookie/jquery.cookie',
        login: '../js/login',
        teacherList: '../js/teacherList',
        teacherAdd: '../js/teacherAdd',
        util: '../js/util'
    },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        language:{
            deps:['jquery','datepicker']
        }
    }
});