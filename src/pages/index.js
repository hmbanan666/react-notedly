import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Layout } from '../components/Layout';

import { Home } from './home';
import { NewNote } from './new';
import { EditNote } from './edit';
import { MyNotes } from './mynotes';
import { Favorites } from './favorites';
import { NotePage } from './note';
import { SignUp } from './signup';
import { SignIn } from './signin';

import { IS_LOGGED_IN } from '../gql/query';

export const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/new" component={NewNote} />
        <PrivateRoute path="/edit/:id" component={EditNote} />
        <PrivateRoute path="/mynotes" component={MyNotes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <Route path="/note/:id" component={NotePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // Если данные загружаются
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, отобразим сообщение об ошибке
  if (error) return <p>Error!</p>;

  // Если пользователь авторизован, направим его к компоненту
  // Иначе перенаправим на страницу авторизации
  return (
    <Route
      {...rest}
      render={(props) =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
