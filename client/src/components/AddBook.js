import React, { Component } from 'react';
import {gql} from 'apollo-boost'; //helps us to write our queries
import {graphql} from 'react-apollo'; //help us bind our query to compponent
import compose from 'lodash.flowright';
//import{getAuthorsQuery,AddBookMutation} from '../queries/queries'

//getting our authors
const getAuthorsQuery=gql` 
{
  authors{
    name
    id
  }
}
`

const addBookMutation=gql`
mutation($name:String!,$genre:String!,$authorId:ID!){
addBook(name:$name,genre:$genre,authorId:$authorId){
name
id
}
}
`

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            genre:'',
            authorId:''
        };
    }
   displayAuthors(){
       var data=this.props.getAuthorsQuery;
       if(data.loading){
           return(<option disabled>loading Authors</option>) //this means in the select Author option box show this messages if data has not yet been loaded
       }else{
           return data.authors.map(author=>{ //author=> this is just a function with anyname
           return(<option key={author.id} value={author.id}>{author.name}</option>)
           })
       }
   }
submitForm(e){
    e.preventDefault();
    //console.log(this.state)
    this.props.addBookMutation({
        variables:{
            name:this.state.name,
            genre:this.state.genre,
            authorId:this.state.authorId
        }
    });

}
      render(){
        //console.log(this.props)
      return (
       <form id="add-book" onSubmit={this.submitForm.bind(this)}>
           <div className="field">
               <label>Book name</label>
               <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/> 
               {/* //our e here is event  target is our input field and value is the value in the field*/}
           </div>
        
          <div className="field">
        <label>Genre</label>
        <input type="text" onChange={(e)=>this.setState({genre:e.target.value})}/>
          </div>
         
         <div className="field">
         <label>Author</label>
         <select onChange={(e)=>this.setState({authorId:e.target.value})}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
         </div>
      <button>+</button>
       </form>


      );
    }
    }

    //export default graphql(getAuthorsQuery)(AddBook);

    export default compose(
   graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
   graphql(addBookMutation,{name:"addBookMutation"})
   )(AddBook);
