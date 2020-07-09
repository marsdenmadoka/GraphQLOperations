//bookschema
const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const authorSchema=new Schema({
name:String,
age:Number

})

module.exports=mongoose.model('Author',authorSchema)
//model('Author') is the same as create collection Author
//model refers to as collection