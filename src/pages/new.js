import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { NoteForm } from '../components/NoteForm';

import { GET_NOTES, GET_MY_NOTES } from '../gql/query';
import { NEW_NOTE } from '../gql/mutation';

export const NewNote = (props) => {
  useEffect(() => {
    document.title = 'New note';
  });

  // Хук мутации
  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    // Повторно получаем запросы, чтобы обновить кеш
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: (data) => {
      // Редирект пользователя
      props.history.push(`note/${data.newNote.id}`);
    },
  });

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note!</p>}
      <NoteForm action={data} />
    </>
  );
};
