import React, { useEffect } from 'react';

export const Favorites = () => {
  useEffect(() => {
    document.title = 'Favorites';
  });

  return (
    <div>
      <h1>Notedly</h1>
      <p>These are my favorites</p>
    </div>
  );
};
