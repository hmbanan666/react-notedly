import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { Note } from '../components/Note';

// Запрос, принимающий переменную ID
const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

export const NotePage = (props) => {
  // ID из url в переменную
  const id = props.match.params.id;
  // Хук запроса
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  // Если данные загружаются
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, отобразим сообщение об ошибке
  if (error) return <p>Error! Note not found</p>;

  return <Note note={data.note} />;
};
