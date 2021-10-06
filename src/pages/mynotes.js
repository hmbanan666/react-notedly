import React, { useEffect } from 'react';

export const MyNotes = () => {
  useEffect(() => {
    document.title = 'My notes';
  });

  return (
    <div>
      <h1>Notedly</h1>
      <p>These are my notes</p>
    </div>
  );
};
