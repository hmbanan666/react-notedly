import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import GlobalStyle from './components/GlobalStyle';

import { Pages } from './pages';

// API URI + кеш
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache({
  /*typePolicies: {
    Query: {
      fields: {
        noteFeed: offsetLimitPagination(),
      },
    },
  },*/
});

// Проверим наличие токена и возвращаем заголовки в контекст
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || '',
    },
  };
});

// Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
});

// Локальный запрос
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;
//
const data = { isLoggedIn: !!localStorage.getItem('token') };
// Записываем данные кеша при начальной загрузке
cache.writeQuery({ query: IS_LOGGED_IN, data });
// Записываем данные кеша после его сброса
client.onResetStore(() => cache.writeQuery({ data }));

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
