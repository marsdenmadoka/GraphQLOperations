const graphql=require('graphql');
const _=require('lodash');
//exporting our dbmodels
const Book=require('../dbschema/book');
const Author=require('../dbschema/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull 
     }=graphql;

// var books=[
//     {name:'the river and the source',genre:'novel',id:'1',authorId:'1'},
//     {name:'the waters and greens',genre:'fantasy',id:'2',authorId:'2'},
//     {name:'homelandking',genre:'short story',id:'3',authorId:'3'},
//     {name:'Spirit lead me',genre:'fantasy',id:'4',authorId:'2'},
//     {name:'oppurtunity knocs',genre:'short story',id:'5',authorId:'1'},
//     {name:'secret battle',genre:'short story',id:'6',authorId:'3'},
// ];

// var authors=[
//     {name:'madoka',age:23,id:'1'},
//     {name:'maggie',age:19,id:'2'},
//     {name:'marsden',age:30,id:'3'}
// ];

const BookType=new GraphQLObjectType({
name:'Book',
fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    author:{
        type:AuthorType,
        resolve(parent,args){
        //return _.find(authors,{id:parent.authorId})
        //getting book and there author
         return Author.findById(parent.authorId);
        }
     }
})
})


const AuthorType=new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),//we cant say bookType only since it will return only one book ad we want all the books of the author to be returned
            resolve(parent,args){ // getting author and there books
                //return _.filter(books,{authorId:parent.id})
        return Book.find({authorId:parent.id})

              }
        }


    })
    })




const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{ //returning one book
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code to get data from db/array
                console.log(typeof(args.id));
              // return _.find(books,{id:args.id});
              return Book.findById(args.id);
            }
        },

author:{ //returing one author
    type:AuthorType,
    args:{id:{type:GraphQLID}},
    resolve(parent,args){
       // return _.find(authors,{id:args.id});
       return Author.findById(args.id);

    }
},

books:{ //retuning all books //getting all books and there authors
type:new GraphQLList(BookType),
resolve(parent,args){
//return books
return Book.find({});
}
},

authors:{ //retuning all authors at the same time and there books
    type:new GraphQLList(AuthorType),
    resolve(parent,args){
       // return authors
       return Author.find({});
    }   
}
}
});



//adding author /book to db 
const Mutation=new GraphQLObjectType({
name:'Mutation',
fields:{
addAuthor:{ //adding an author to the database
    type:AuthorType,
    args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        age:{type:new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parent,args){
    let author=new Author({ //this Author is our model that we imported
     name:args.name,
     age:args.age 
        }); 
       return author.save(); //saving our author to mongodb
   }
   },
 addBook:{
     type:BookType,
     args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        genre:{type:new GraphQLNonNull(GraphQLString)},
        authorId:{type:new GraphQLNonNull(GraphQLID)}
     },
     resolve(parent,args){
         let book= new Book({
           name:args.name,
           genre:args.genre,
           authorId:args.authorId

         });
         return book.save();
     }
 }

   }
   })



module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})

//adding Author to db snd retriving his data
// mutation {
//     addAuthor(name:"shaun",age:30){
//       name
//       age
//     }
//   }

//adding book
// mutation {
//     addBook(name:"Black lives matter",genre:"documentary",authorId:"5f072c50a2437c41865c27b7"){
//       name
//       genre
//     }
//   }


//getting one author 
// {
//     author(id:2){
//     name
//     age
//    }
//   }

   //run this in your fronted for getting author and there books
        // {
        //     author(id:2){
        //       name
        //       age
        //         books{
        //           name
        //           genre
        //         }
        //       }
        //     }

//for getting book and there author
// {
//     book(id:2){
//       name
//       genre
//       author{
//         name
//       }
//     }
//   } 

//getting all books
// {
//     books{
//       name
//       genre
//       }
//     }

//getting all books and there authors
// {
//     books{
//       name
//       author{
//         name
//         age
//       }
//       }
//     }

//{

//retuning  all authors and there books
    // authors{
    //     name
    //       books{
    //         name
    //       }
    //     }
    //   }