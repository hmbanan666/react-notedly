import React from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { ButtonAsLink } from './ButtonAsLink';
import { IS_LOGGED_IN } from '../gql/query';

import logo from './../../public/logo192.png';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const Header = (props) => {
  // Хук запроса для проверки состояния авторизации пользователя
  const { data } = useQuery(IS_LOGGED_IN);

  const client = useApolloClient();

  return (
    <HeaderBar>
      <img src={logo} alt="Logo" height="40" />
      <LogoText>Notedly</LogoText>

      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              // Удалим токен
              localStorage.removeItem('token');
              // Очистим кеш
              client.resetStore();
              // Обновляем локальное состояние
              client.writeQuery({
                query: IS_LOGGED_IN,
                data: { isLoggedIn: false },
              });
              // Редирект
              props.history.push('/');
            }}
          >
            Logout
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or{' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default withRouter(Header);
