import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { NoteForm } from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

export const EditNote = (props) => {
  // ID из url в переменную
  const id = props.match.params.id;
  // Хук запроса
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  // Текущий пользователь
  const { data: userdata } = useQuery(GET_ME);

  // Определим мутацию
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id,
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    },
  });

  // Если данные загружаются
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, отобразим сообщение об ошибке
  if (error) return <p>Error! Note not found</p>;

  // Если текущий пользователь не автор
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit</p>;
  }

  return <NoteForm content={data.note.content} action={editNote} />;
};
