import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo'
import Routes from './routes';

const client = new ApolloClient({
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )
};

ReactDOM.hydrate(
  <Root />,
  document.getElementById('app')
);