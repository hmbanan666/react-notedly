import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import { UserForm } from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

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
      client.writeData({ data: { isLoggedIn: true } });
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
