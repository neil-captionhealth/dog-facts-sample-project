import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useTransition,
  SetStateAction,
} from 'react';
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
  const [isFavoriteRemoval, setFavoriteRemoval] = useState(false);
  const [isPending, startTransition] = useTransition();

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

  const goToPrevPage = () => {
    let previousPage = page - 1;

    while ((pagesToOmit.includes(previousPage) || previousPage === 0) && data) {
      console.log('find a prev page');
      if (previousPage === 0) {
        previousPage = data?.last_page;
      } else {
        previousPage--;
      }
    }

    console.log(previousPage, 'previousPage final');
    startTransition(() => {
      setPage(previousPage);
    });
  };

  const goToNextPage = () => {
    let nextPage = page + 1;

    while (
      pagesToOmit.includes(nextPage) ||
      (data && nextPage > data.last_page)
    ) {
      console.log('find a next page');
      if (data && nextPage > data.last_page) {
        nextPage = 1;
      } else {
        nextPage++;
      }
    }

    console.log(nextPage, 'nextPage final');
    startTransition(() => {
      setPage(nextPage);
    });
  };

  const openPreviousFact = () => {
    const previousFact = activeFactId - 1;

    if (previousFact < 0 && nonFavoriteFacts) {
      console.log('set page?');
      if (data && page - 1 < 1) {
        startTransition(() => {
          setPage(data.last_page);
        });
      } else {
        goToPrevPage();
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
        startTransition(() => {
          setPage(1);
        });
      } else {
        goToNextPage();
      }
      setActiveFactId(0);
    } else {
      setActiveFactId(nextFact);
    }

    setPrevious(false);
  };

  const handleFavorite = (data: SetStateAction<IFactFavorites>) => {
    setFavorite(data);
    setFavoriteRemoval(true);
  };

  useEffect(() => {
    if (nonFavoriteFacts && isPrevious) {
      setActiveFactId(nonFavoriteFacts.length - 1);
    }
  }, [nonFavoriteFacts, isPrevious]);

  // load a new page once dataset is empty or once we reached a last fact
  useEffect(() => {
    if (
      nonFavoriteFacts &&
      (!nonFavoriteFacts.length || nonFavoriteFacts.length === activeFactId)
    ) {
      console.log('load a new page once dataset is empty.');
      goToNextPage();
      setActiveFactId(0);
    }
  }, [nonFavoriteFacts, activeFactId]);

  //update pagesToOmit on a new page
  useEffect(() => {
    if (
      nonFavoriteFacts &&
      !nonFavoriteFacts.length &&
      data &&
      page === data?.current_page
    ) {
      console.log('add a page to omit');

      setPagesToOmit((pages) => {
        if (!pages.includes(page)) {
          return pages.concat(page);
        }
        return pages;
      });
    }
  }, [page, nonFavoriteFacts, data]);

  // update pagesToOmit after favorites removal
  useEffect(() => {
    console.log('update pagesToOmit');

    if (isFavoriteRemoval) {
      setPagesToOmit((pages) =>
        pages.filter((page) =>
          Object.keys(favorites).every((key) => {
            const favorite = favorites[key];

            if (favorites[key].fromPage !== page) {
              return true;
            }
            return favorite.isFavorite;
          })
        )
      );
    }
    setFavoriteRemoval(false);
  }, [favorites, isFavoriteRemoval]);

  if (isLoading || isPending) return <span>Loading...</span>;
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
        setFavorite={handleFavorite}
        facts={facts}
      />
    </>
  );
};
