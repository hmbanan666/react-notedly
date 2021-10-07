import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ButtonAsLink } from './ButtonAsLink';
import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query';

export const FavoriteNote = (props) => {
  // Сохраним число избранных заметок пользователя как состояние
  const [count, setCount] = useState(props.favoriteCount);

  // Если пользователь отметил заметку, сохраним
  const [favorite, setFavorite] = useState(
    // Проверим, присутствует ли заметка в списке
    props.me.favorites.filter((note) => note.id === props.noteId).length > 0
  );

  // Хук мутации
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.noteId,
    },
    // Повторно получаем запрос для обновления кеша
    refetchQueries: [{ query: GET_MY_FAVORITES }],
  });

  return (
    <>
      {favorite ? (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorite(false);
            setCount(count - 1);
          }}
        >
          Remove
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorite(true);
            setCount(count + 1);
          }}
        >
          Add to favorites
        </ButtonAsLink>
      )}
      : {count}
    </>
  );
};
