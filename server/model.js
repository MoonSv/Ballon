const mongoose = require('mongoose')
// 连接mongodb，并且使用ballon这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/test-chat';
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
    console.log('mongo connect success')
})

const models = {
    user: {
        'username': {type: String, require:true},
        'password': {type: String, require:true},
        'image': {type:String},
        'desc': {type:String},
        'title':{type:String},
        'first_name':{type:String},
        'last_name':{type:String},
        'phone_number':{type:String},
        'address':{type:String},
        'gender':{type:String}
        // 如果是boss还有两个字段

    },
    chat:{

    }
}
for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}