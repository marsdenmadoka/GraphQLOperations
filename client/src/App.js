import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'; 
import {ApolloProvider} from 'react-apollo' //wraps and inject our application with any data we receive from server into our application

//importing our components
import BookList from'./components/BookList';
import AddBook from'./components/AddBook';

//setting up Apollo client 
const client = new ApolloClient({
uri:'http://localhost:5000/graphql' 

})
//end of setup

class App extends Component {
  render(){
  return (

    // here we wrap our data with ApolloProvider that inject our application with any data we receive from server into our application
    <ApolloProvider client={client}> 
    {/* the client in {client} refers to the one const client while setting up apolloClient */}
    <div id="main">
    <h1>madoka reading books</h1>
    <BookList/>    {/* react wiil serach this Booklist and render it since we imported it */}
     <AddBook/>
    </div>

    </ApolloProvider>
  );
}
}
export default App;
