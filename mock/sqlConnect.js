const mysql=require('mysql');
const sqlobj={
    host:"localhost",
    user:"root",
    password:"",
    database:"ego"
}
const client=mysql.createConnection(sqlobj);

function sqlConnect(sql,arr,callback){
    client.query(sql,arr,(error,result)=>{
        if(error){
            console.log(error);
            return;
        }
        callback(result)
    })
}
module.exports=sqlConnect;
