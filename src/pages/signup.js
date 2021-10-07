import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';

import { UserForm } from '../components/UserForm';
import { SIGNUP_USER } from '../gql/mutation';
import { IS_LOGGED_IN } from '../gql/query';

export const SignUp = (props) => {
  useEffect(() => {
    document.title = 'Sign Up';
  });

  // Apollo Client
  const client = useApolloClient();
  // Хук мутации
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      // Когда мутация завершена, сохраним JWT в Local
      localStorage.setItem('token', data.signUp);
      // Обновим локальный кеш
      client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: true } });
      // Редирект пользователя
      props.history.push('/');
    },
  });

  return (
    <>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </>
  );
};
