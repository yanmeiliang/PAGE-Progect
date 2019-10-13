//加载
const express=require('express');
const  service=require('./services');
//express自带一个路由容器
const rounter=express.Router();
//路由容器里添加路由
//登录
rounter.get('/',service.showLogin);
rounter.post('/login',service.islogin);
//注册
rounter.get('/register',service.showRegist);
rounter.post('/register',service.isregist);
//分页查询
rounter.get('/look',service.showsearch);
//添加页面
rounter.get('/add',service.addlook);
rounter.post('/add',service.adddata);
//修改
rounter.get('/search',service.showmodif);
rounter.post('/modify',service.modify);
//删除
rounter.get('/delet',service.delete);
//求总数据
rounter.get('/sum',service.sum);
//分页
rounter.get('/page',service.page);

//暴露路由
module.exports=rounter;