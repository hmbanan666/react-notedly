import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_MY_FAVORITES } from '../gql/query';
import { NoteFeed } from '../components/NoteFeed';

export const Favorites = () => {
  useEffect(() => {
    document.title = 'Favorites';
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITES);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // Если запрос выполнен успешно и содержит заметки, возвращаем их в ленту
  if (data.me.favorites.length !== 0) {
    return <NoteFeed notes={data.me.favorites} />;
  } else {
    // Если же запрос выполнен успешно, но заметок нет
    return <p>No favorites yet</p>;
  }
};
