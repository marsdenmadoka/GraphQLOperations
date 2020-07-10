import React, { Component } from 'react';
import {gql} from 'apollo-boost'; //helps us to write our queries
import {graphql} from 'react-apollo'; //help us bind our query to compponent

//getting our books
const getAuthorsQuery=gql` 
{
  authors{
    name
    id
  }
}
`

class AddBook extends Component {
   displayAuthors(){
       var data=this.props.data;
       if(data.loading){
           return(<option disabled>loading Authors</option>) //this means in the select Author option box show this messages if data has not yet been loaded
       }else{
           return data.authors.map(author=>{ //author=> this is just a function with anyname
           return(<option key={author.id} value={author.id}>{author.name}</option>)
           })
       }
   }
      render(){
        //console.log(this.props)
      return (
       <form id="add-book">
           <div className="field">
               <label>Book name</label>
               <input type="text"/>
           </div>
        
          <div className="field">
        <label>Genre</label>
        <input type="text"/>
          </div>
         
         <div className="field">
         <label>Author</label>
         <select>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
         </div>
      <button>+</button>
       </form>


      );
    }
    }

    export default graphql(getAuthorsQuery)(AddBook);

