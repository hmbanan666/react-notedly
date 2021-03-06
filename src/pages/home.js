import React from 'react';
import { useQuery } from '@apollo/client';

import { NoteFeed } from '../components/NoteFeed';
import { Button } from '../components/Button';
import { GET_NOTES } from '../gql/query';

export const Home = () => {
  // Хук запроса
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // Если данные загружаются
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, отобразим сообщение об ошибке
  if (error) return <p>Error!</p>;

  // Если получение данных успешно, отобразим в UI
  return (
    <>
      <NoteFeed notes={data.noteFeed.notes} />

      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: { cursor: data.noteFeed.cursor },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    // Совмещаем новые результаты со старыми
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes,
                    ],
                    __typename: 'noteFeed',
                  },
                };
              },
            })
          }
        >
          Load more
        </Button>
      )}
    </>
  );
};
