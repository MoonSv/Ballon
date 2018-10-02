const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// 类似于mysql的表，mongo里有文档、字段的概念

// const User = mongoose.model('user', new mongoose.Schema({
//     name: {type:String, require:true},
//     age: {type:Number, require:true},
// }));

// 新增数据
// User.create({
//     name: 'Jack',
//     age: 18
// }, function (err, doc) {
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// });

// 删除age为18的
// User.remove({age:18}, function (err,doc) {
//     console.log(doc)
// })

// 更新
// User.update({'name': 'Jack'}, {'$set':{age:27}}, function (err,doc) {
//     console.log(doc)
// })

// 新建app
const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter);

app.get('/', function (req, res) {
    res.send('<h1>Hello, Joe</h1>')
})

app.get('/data', function (req, res) {
    User.findOne({name:"Jack"}, function (err, doc) {
        return res.json(doc)
    })
    res.json({name: 'Joe', mood:'yeah!', job:'FrontEnd'})
})

app.listen(8000, function () {
    console.log('Node app start at port 8000.')
})