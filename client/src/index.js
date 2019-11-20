import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Pages from './pages'; 
import { resolvers, typeDefs } from './resolvers';
import injectStyles from './styles';

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();
const client = new ApolloClient({
	cache,
	link: new HttpLink({
		uri: 'http://localhost:4000/graphql',
		headers: {
			authorization: localStorage.getItem('token'),
			'client-name': 'Restaurant Reviews[web]',
			'client-version': '1.0.0'
		}
	}),
	resolvers,
	typeDefs
});

cache.writeData({
	data: {
		isLoggedIn: !!localStorage.getItem('token')
	}
});

const IS_LOGGED_IN = gql`
	query IsUserLoggedIn {
		isLoggedIn @client
	}
`;

function IsLoggedIn() {
	const { data } = useQuery(IS_LOGGED_IN);
  // TODO - check if user is logged in
	return <Pages/>
}

injectStyles();
ReactDOM.render(
	<ApolloProvider client={client}>
		<IsLoggedIn />
	</ApolloProvider>,
	document.getElementById('root')
);
