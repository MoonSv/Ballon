const express = require('express');
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')

Router.get('/list',function (req, res) {
    // 清楚所有user数据
    // User.remove({}, function(e,r){})
    User.find({}, function (err, doc) {
        return res.json(doc)
    })
})
Router.post('/usr/register', function(req, res){
    console.log(req.body)
    const {username, password, type} = req.body
    User.findOne({username:username}, function(err, doc){
        if(doc){
            return res.json({code:1, msg:'用户名重复'})
        }
        User.create({username, password, type}, function(err, doc){
            if(err){
                return res.json('后端出错了')
            }
            return res.json({code:0})
        })
    })
})
Router.post('/usr/login', function(req, res){
    // console.log(req.body)
    const {username, password} = req.body
    User.findOne({username:username, password:password}, function(err, doc){
        if(!doc){
            return res.json({code:1, msg:'用户名不存在或密码错误', data:username})
        }
        res.cookie('userid', doc._id);
        return res.json({code:0, msg:'登陆成功', data:doc})
    })
})
Router.post('/usr/edit_profile', function(req, res){
    console.log('获得用户更新信息...')
    console.log(req.body)
    const{userid} = req.cookies;
    const {first_name,last_name, address, phone_number, gender} = req.body
    const user = User.findOne({_id: userid});
    user.update({first_name,last_name, address, phone_number, gender}, function(err, doc){
        if(err){
            return res.json('后端出错了')
        }
        return res.json({code:0, msg:'更新成功'})
    })

})
Router.get('/info', function (req, res) {
    const { userid } = req.cookies;
    // 用户没有cookie
    if (!userid) {
        return res.json({code:1})
    }
    User.findOne({_id: userid}, function(err, doc){
        if(err){
            return res.json({code:1, msg: "internal error"})
        }
        if(doc){
            console.log('返回用户校验信息...')
            console.log(doc)
            return res.json({code:0, data: doc})
        }
    })
})


Router.get('/home', function (req, res) {
    // 用户没有cookie
    return res.json({code:1})
})

module.exports = Router