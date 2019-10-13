
const data=require('./mysql');
exports.showLogin=(req,res)=>{
    res.render('login');
}
exports.islogin=(req,res)=>{
    let dat=req.body;
    let sql="select * from user where (email=? and pwd=?) or email=?";
    let date=[dat.email,dat.password,dat.email];
    data.base(sql,date,(result)=>{
          //未找到必须放前面
        if(result.length==0)
        {
            console.log(22);
            res.status(200).json({
                err_code: 0
            })
        }
        //密码正确  数组result
       else if(result[0].pwd==dat.password)
        {
            console.log(110);
            res.status(200).json({
                err_code:2
            })
        }
        //密码错误
        else if (result[0].pwd!=dat.password) {
            console.log(456);
            res.status(200).json({
                err_code: 1
            })
        }
       //服务器错误
       //  res.status(500).json({
       //      err_code:500
       //  })

    })
}
exports.showRegist=(req,res)=>{
    console.log(111111);
    res.render('register');
}
exports.isregist=(req,res)=>{
    let dat=req.body;
    let sql='insert into user set email=? , pwd=?';
    let sql1='select * from user where  email=?';
    let date=[dat.email,dat.password];
    let dat1=[dat.email];
    data.base(sql1,dat1,(result)=>{
        if(result.length>1)
        {
            res.status(200).json({
                err_code:1
            })
        }
       else if(result.length==0)
        {
            data.base(sql,date,(result)=>{
                if(result)
                {
                    res.status(200).json({
                        err_code:2
                    })
                }
            })
        }
    })
    console.log(dat);
}
exports.showsearch=(req,res)=>{
    let sql='select * from informat';
    data.base(sql,null,(result)=>{
        // console.log(result);
        res.render('pagequery',{item:result});
    })
}
//添加
exports.addlook=(req,res)=>{
    res.render('add');

}
exports.adddata=(req,res)=>{
let dat2=req.body;
// console.log(req.body);
let sql='insert into informat set title=?,user=?,address=?,time=?,check1=?';
    // 'insert into informat set title=? , user=?, address=? ,time=? ,check=? ';
let dat1=[dat2.topic,null,dat2.url,dat2.data,dat2.check];
data.base(sql,dat1,(result)=>{
    console.log(result);
    // res.redirect('/look');
    if(result.affectedRows==1)
    {
        res.status(200).json({
            err_code:1
        })
    }
    else {
        res.status(500).json({
            err_code:2
        })
    }
})

}
// 修改
exports.showmodif=(req,res)=>{
    console.log(req.query);
    let sql='select * from informat where id=?';
    let date=[req.query.id];
    data.base(sql,date,(result)=>{
        // console.log(result);
        //渲染的第二个参数是对象,若对象是数组在{item:数组}
        res.render('search',result[0]);
    })

}
exports.modify=(res,req)=>{
    let dat2=res.body;
    // console.log(dat2.id);
    let sql='update informat set title=?,user=?,address=?,time=?,check1=? where id=?'
    let dat1=[dat2.title,dat2.user,dat2.address,dat2.time,dat2.check,dat2.id];
    console.log(dat1);
    data.base(sql,dat1,(result)=>{
        if(result.affectedRows==1)
        {
            req.status(200).json({
                err_code:1
            })
        }
    })
}
exports.delete=(res,req)=>{
// console.log(res.query);
    let id=res.query.id;
    let sql='delete from  informat where id=?';
    let dat=[id];
    data.base(sql,dat,(result)=>{
        if(result.affectedRows==1)
        {
            req.status(200).json({
                err_code:1
            })
        }
    })
}
//求总数
exports.sum=(req,res)=>{
    let sql='select  count(*) as count from informat';
    data.base(sql,null,(result)=>{
        if(result)
        {
            res.status(200).json({
                err_code:1,
                count:result[0].count
            })
        }
    })

}
//分页
exports.page=(req,res)=>{
    console.log(req.query);
    // offset是从第几个开始
let sql='select * from informat LIMIT 5 OFFSET ?'
    let date=[(req.query.page)*5-5];
data.base(sql,date,(result)=>{
    res.render('pagequery',{item:result});
})
}