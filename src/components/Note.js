import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';

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
          {format(parseISO(note.createdAt), 'MM Do yyyy')}
        </MetaInfo>
        <UserActions>
          <em>Favorites:</em> {note.favoriteCount}
        </UserActions>
      </MetaData>

      <ReactMarkdown>{note.content}</ReactMarkdown>
    </StyledNote>
  );
};
