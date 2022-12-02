import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import Header from '../../atomic/Header';
import Facts from '../../organisms/Facts';
import Favorites from '../../organisms/Favorites';

import { IFactFavorites } from '../../../types/fact';
import { fetchFacts } from './../../../../api/endpoints';

export const FavoritesFacts = () => {
  //const [facts, setFacts] = useState<IFact[]>(mockedData);
  const [favorites, setFavorite] = useState<IFactFavorites>({});

  const { isLoading, error, data } = useQuery({
    queryKey: ['getFacts'],
    queryFn: fetchFacts,
  });

  const facts = data?.data;
  console.log(facts, 'facts data');

  const nonFavoriteFacts = useMemo(
    () => facts?.filter((fact) => !favorites[fact.id]?.isFavorite),
    [facts, favorites]
  );

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Oops! An error has occurred. Don't worry!.</span>;

  return (
    <>
      <Header title="Dog Facts" />
      <Facts setFavorite={setFavorite} facts={nonFavoriteFacts} />
      <Favorites
        favorites={favorites}
        setFavorite={setFavorite}
        facts={facts}
      />
    </>
  );
};
