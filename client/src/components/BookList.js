import React, { Component } from 'react';
import {gql} from 'apollo-boost'; //helps us to write our queries
import {graphql} from 'react-apollo'; //help us bind our query to compponent
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
  render(){
    console.log(this.props)
  return (
    <div>
    <ul id="book-list">
        <li>Book name</li>
    </ul>
    </div>
  );
}
}
export default graphql(getBooksQuery)(BookList);  //here weare using the default graphql(import {graphql}from 'react-apollo ) to bind our Query(getBooksQuery) to the component(BookList)
