const express = require('express');
const router = express.Router();
const sqlConnect = require('./sqlConnect');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const config = require('./config');
const url = require('url')

router.use(bodyParser.urlencoded({
  extended: true
}))

router.post('/login', (req, res) => {
  const uname = req.body.username;
  const pword = req.body.password;
  const sql = "select * from users where username=? and password=?";
  var arr = [uname, pword];
  console.log(arr);
  sqlConnect(sql, arr, result => {
    if (result.length > 0) {
      const token = jwt.sign({
        username: uname,
        password: pword
      }, config.jwtScrect);
      res.send({
        status: 200,
        username: uname,
        password: pword,
        token: token
      })
    } else {
      res.send({
        status: 500,
        msg: "用户名密码错误"
      })
    }
  })

})
/**
 * 查询商品接口
 * 请求方式:get
 * 参数:page
 */
router.get('/backend/item/selectTbItemAllByPage', (req, res) => {
  const page = url.parse(req.url, true).query.page || 1
  const sql = "select * from project order by id desc limit 10 offset " + (page - 1) * 10;
  sqlConnect(sql,null,result=>{
      if(result.length>0){
        res.send({
            status:200,
            data:{
                result
            }
        })
      }else{
        res.send({
            status:500,
            msg:"暂无数据"
        })
      }
  })
})

/**
 * 数据总条数接口
 */
 router.get("/total", (req, res) => {
  const sql = "select count(*) from project where id";
  sqlConnect(sql, null, result => {
      if (result.length > 0) {
          res.send({
              status: 200,
              result
          })
      } else {
          res.send({
              status: 500,
              msg: "查询失败"
          })
      }
  })
})

/**
 * 商品删除接口
 */
 router.get("/backend/item/deleteItemById", (req, res) => {
  const id = url.parse(req.url, true).query.id;
  const sql = "delete from project where id=?";
  console.log(id);
  const arr = [id];
  sqlConnect(sql, arr, result => {
      // 删除返回的是影响行数
      if (result.affectedRows > 0) {
          res.send({
              status: 200,
              success: true
          })
      } else {
          res.send({
              status: 500,
              msg: "删除失败"
          })
      }
  })
})



/**
 * 商品增加接口
 */
 router.post('/backend/item/addItem', (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const title = req.body.title;
  const sellPoint = req.body.sellPoint;
  const price = req.body.price;
  const num = req.body.num;
  const desc = req.body.desc;
  const sql = "insert into project values(?,?,'',?,?,1,?,'','','','',?)";
  var arr = [id, title,sellPoint,price,num,desc];
  // console.log(arr);
  sqlConnect(sql, arr, result => {
    // 删除返回的是影响行数
    if (result.affectedRows > 0) {
      res.send({
          status: 200,
          success: true
      })
  } else {
      res.send({
          status: 500,
          msg: "删除失败"
      })
  }
  })

})


module.exports = router;
