import './App.css';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import 'bulma/css/bulma.min.css';
import Header from './components/Header';

//graphql endpoint
const httpLink = createHttpLink({
    uri: '/graphql',
});

//middleware that attaches JWT token to every request as an `authorisation` header
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        <div className="container">
          <Header />
          <div className='divider'></div>
          <Outlet />
        </div>
    </ApolloProvider>
  );
};

export default App;

