import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { NoteFeed } from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

export const MyNotes = () => {
  useEffect(() => {
    document.title = 'My notes';
  });

  const { loading, error, data } = useQuery(GET_MY_NOTES);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // Если запрос выполнен успешно и содержит заметки, возвращаем их в ленту
  if (data.me.notes.length !== 0) {
    return <NoteFeed notes={data.me.notes} />;
  } else {
    // Если же запрос выполнен успешно, но заметок нет
    return <p>No notes yet</p>;
  }
};
