import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import MainRoute from '../../shared/router'

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch  from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';

const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
        fetch: fetch
    }),
    cache: new InMemoryCache(),
  });


const context = {}

const renderToString = (url, context, store) => {
    

    return ReactDOMServer.renderToString(
        <div id="app">
            <ApolloProvider client={client}>
                <StaticRouter location={url} context={context}>
                    <MainRoute />
                </StaticRouter>
            </ApolloProvider>
        </div>
    );
}

module.exports = (req, res, next) => {
    console.log('reached middleware: ', req.url)
    if(req.url === '/graphql') {
        return next()
    }
    if (context.url) {
		res.writeHead(301, {
			Location: context.url
		})
		res.end()
	}
    res.render('index',{
        html: renderToString(req.url, context)
    });
}