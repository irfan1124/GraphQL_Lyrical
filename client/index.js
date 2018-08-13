import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo'
import Routes from './routes';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch  from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  link: new createHttpLink({
    uri: '/graphql',
    fetch,
  }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
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