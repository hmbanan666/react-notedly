import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';

import { UserForm } from '../components/UserForm';
import { SIGNIN_USER } from '../gql/mutation';
import { IS_LOGGED_IN } from '../gql/query';

export const SignIn = (props) => {
  useEffect(() => {
    document.title = 'Sign In';
  });

  // Apollo Client
  const client = useApolloClient();
  // Хук мутации
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      // Когда мутация завершена, сохраним JWT в Local
      localStorage.setItem('token', data.signIn);
      // Обновим локальный кеш
      client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: true } });
      // Редирект пользователя
      props.history.push('/');
    },
  });

  return (
    <>
      <UserForm action={signIn} formType="signin" />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </>
  );
};
