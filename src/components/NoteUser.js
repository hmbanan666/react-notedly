import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import { GET_ME } from '../gql/query';
import DeleteNote from './DeleteNote';
import { FavoriteNote } from './FavoriteNote';

export const NoteUser = (props) => {
  const { loading, error, data } = useQuery(GET_ME);

  // Если данные загружаются
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, отобразим сообщение об ошибке
  if (error) return <p>Error!</p>;

  return (
    <>
      <FavoriteNote
        me={data.me}
        noteId={props.note.id}
        favoriteCount={props.note.favoriteCount}
      />
      <br />
      {data.me.id === props.note.author.id && (
        <>
          <Link to={`/edit/${props.note.id}`}>Edit</Link> <br />
          <DeleteNote noteId={props.note.id} />
        </>
      )}
    </>
  );
};
