// 加载
const express=require('express');
const  path=require('path');
const rounter=require('./rount');
const  BodyParse=require('body-parser');
const  app=express();
//----------------配置
  //静态资源开发
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')));
//模板渲染设置
app.set('view engine','html');
app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'./views'));
//post请求设置
app.use(BodyParse.urlencoded({extended:false}));
app.use(BodyParse.json());
//-------------测试
//路由设置
 app.use(rounter);
//---------------监听
app.listen(2324,()=>{
    console.log('服务器启动成功:http://localhost:2324');
})