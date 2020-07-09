//bookschema
const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const bookSchema=new Schema({
name:String,
genre:String,
authorId:String

})

module.exports=mongoose.model('Book',bookSchema)
//model('Book') is the same as create collection Book
//model refers to as collection