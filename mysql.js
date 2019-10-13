const mysql=require("mysql");
exports.base=(sql,data,callback)=>{
    var connection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:"yml123",
        database:"mybook"
    });
    connection.connect();
    connection.query(sql,data,(err,result)=>{
        if(err) throw err;
        // console.log(result);
        callback(result);
    });
    connection.end();
}

