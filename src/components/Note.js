import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format, parseISO } from 'date-fns';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { NoteUser } from './NoteUser';
import { IS_LOGGED_IN } from '../gql/query';

// Ограничим расширение заметок
const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

// Метаданные заметки
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

// Пространство между
const MetaInfo = styled.div`
  padding-right: 1em;
`;

// Выравниваем по правой стороне на большом экране
const UserActions = styled.div`
  margin-left: auto;
`;

export const Note = ({ note }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  // Если данные загружаются
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, отобразим сообщение об ошибке
  if (error) return <p>Error!</p>;

  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          {format(parseISO(note.createdAt), 'dd.MM.yyyy')}
        </MetaInfo>

        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {note.favoriteCount}
          </UserActions>
        )}
      </MetaData>

      <ReactMarkdown>{note.content}</ReactMarkdown>
    </StyledNote>
  );
};
