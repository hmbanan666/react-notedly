import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import { UserForm } from '../components/UserForm';

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

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
      client.writeData({ data: { isLoggedIn: true } });
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
