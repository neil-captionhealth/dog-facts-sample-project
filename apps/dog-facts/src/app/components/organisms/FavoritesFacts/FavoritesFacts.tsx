import { useState, useMemo, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import Header from '../../atomic/Header';
import Facts from '../../organisms/Facts';
import Favorites from '../../organisms/Favorites';

import { IFactFavorites } from '../../../types/fact';
import { fetchFacts } from './../../../../api/endpoints';

import { queryClient } from '../../../app';

const PREFETCH_DISTANCE = 2;

export const FavoritesFacts = () => {
  const [favorites, setFavorite] = useState<IFactFavorites>({});
  const [activeFactId, setActiveFactId] = useState(0);
  const [page, setPage] = useState(1);
  const [isPrevious, setPrevious] = useState(false);
  const [pagesToOmit, setPagesToOmit] = useState<number[]>([]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['getFacts', page],
    queryFn: () => fetchFacts(page),
    keepPreviousData: true,
  });

  const facts = data?.data;

  const nonFavoriteFacts = useMemo(
    () => facts?.filter((fact) => !favorites[fact.id]?.isFavorite),
    [facts, favorites]
  );

  // TODO
  const prefetchFacts = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: ['getFacts', activeFactId],
      queryFn: () => fetchFacts(page + 1),
    });
  }, [activeFactId, page]);

  const findPrevPage = () => {
    let previousPage = page - 1;

    while ((pagesToOmit.includes(previousPage) || previousPage === 0) && data) {
      if (previousPage === 0) {
        previousPage = data?.last_page;
      } else {
        previousPage--;
      }
    }

    console.log(previousPage, 'previousPage final');
    setPage(previousPage);
  };

  const findNextPage = () => {
    let nextPage = page + 1;

    while (
      (pagesToOmit.includes(nextPage) || nextPage === data?.last_page) &&
      data
    ) {
      if (nextPage === data.last_page) {
        nextPage = 1;
      } else {
        nextPage++;
      }
    }

    console.log(nextPage, 'nextPage final');
    setPage(nextPage);
  };

  const openPreviousFact = () => {
    const previousFact = activeFactId - 1;

    if (previousFact < 0 && nonFavoriteFacts) {
      console.log('set page?');
      if (data && page - 1 < 1) {
        setPage(data.last_page);
      } else {
        findPrevPage();
      }
    } else {
      setActiveFactId(previousFact);
    }
    setPrevious(true);
  };

  const openNextFact = () => {
    const nextFact = activeFactId + 1;

    if (nonFavoriteFacts && nextFact === nonFavoriteFacts?.length) {
      if (data && page + 1 > data.last_page) {
        setPage(1);
      } else {
        findNextPage();
      }
      setActiveFactId(0);
    } else {
      setActiveFactId(nextFact);
    }
  };

  useEffect(() => {
    console.log('update fact on the last page');
    console.log(isPrevious, 'isPrevious');

    if (nonFavoriteFacts && isPrevious) {
      setActiveFactId(nonFavoriteFacts.length - 1);
    }
  }, [nonFavoriteFacts, isPrevious]);

  // load a new page once dataset is empty or once we reached a last fact
  useEffect(() => {
    console.log(nonFavoriteFacts?.length, 'nonFavoriteFacts.length');
    if (
      nonFavoriteFacts &&
      (!nonFavoriteFacts.length || nonFavoriteFacts.length === activeFactId)
    ) {
      if (!nonFavoriteFacts.length && !pagesToOmit.includes(page)) {
        setPagesToOmit((pages) => pages.concat(page));
      }
      console.log('load a new page once dataset is empty.');
      setPage((page) => page + 1);
      setActiveFactId(0);
    }
  }, [nonFavoriteFacts, activeFactId]);

  //reset isPrevious case
  useEffect(() => {
    setPrevious(false);
  }, [nonFavoriteFacts]);

  // update pagesToOmit on favorites event
  useEffect(() => {
    console.log('update pagesToOmit');

    setPagesToOmit((pages) =>
      pages.filter((page) =>
        Object.keys(favorites).every((key) => {
          const favorite = favorites[key];

          return favorite.isFavorite && favorites[key].fromPage === page;
        })
      )
    );
  }, [favorites]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Oops! An error has occurred. Don't worry!.</span>;

  return (
    <>
      <Header title="Dog Facts" />
      <Facts
        setFavorite={setFavorite}
        facts={nonFavoriteFacts}
        openPreviousFact={openPreviousFact}
        openNextFact={openNextFact}
        activeFactId={activeFactId}
        fromPage={page}
      />
      <Favorites
        favorites={favorites}
        setFavorite={setFavorite}
        facts={facts}
        fromPage={page}
      />
    </>
  );
};
