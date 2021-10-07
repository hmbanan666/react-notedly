import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalStyle from './components/GlobalStyle';
import { Pages } from './pages';

// API URI + кеш
const uri = process.env.API_URI;
const cache = new InMemoryCache({
  /*typePolicies: {
    Query: {
      fields: {
        noteFeed: offsetLimitPagination(),
      },
    },
  },*/
});

// Apollo Client
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
