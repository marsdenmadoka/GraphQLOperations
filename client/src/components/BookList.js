import React, { Component } from 'react';
import {gql} from 'apollo-boost'; //helps us to write our queries
import {graphql} from 'react-apollo'; //help us bind our query to compponent
//import {getBooksQuery} from '../queries/queries'

//getting our books
const getBooksQuery=gql` 
{
  books{
    name
    id
  }
}
`

class BookList extends Component {
displayBooks(){
var data = this.props.data;
if(data.loading){
  return(<div>loading books..</div>);
}else{
  return data.books.map(book=>{
return(
<li key={book.id}> {book.name}</li>
) 

  })
}

}
  render(){
    //console.log(this.props)
  return (
    <div>
    <ul id="book-list">
      {/* this.referes to the component and te function inside the compponent */}
        {this.displayBooks()} 
    </ul>
    </div>
  );
}
}
export default graphql(getBooksQuery)(BookList);  //here weare using the default graphql(import {graphql}from 'react-apollo ) to bind our Query(getBooksQuery) to the component(BookList)
