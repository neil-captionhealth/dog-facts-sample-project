import { Dispatch, SetStateAction } from 'react';

import FactBox from '../../molecules/FactBox';
import ControlButton from '../../atomic/ControlButton';

import { IFactFavorites, IFact } from '../../../types/fact';

import styled from '@emotion/styled';

const Controls = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

interface Props {
  setFavorite: Dispatch<SetStateAction<IFactFavorites>>;
  facts?: IFact[];
  openPreviousFact: () => void;
  openNextFact: () => void;
  activeFactId: number;
  fromPage: number;
}

export const Facts = ({
  setFavorite,
  facts = [],
  openPreviousFact,
  openNextFact,
  activeFactId,
  fromPage,
}: Props) => {
  const currentFact = facts[activeFactId];

  if (!currentFact) {
    return <span>All posts reside in your favorites!</span>;
  }

  return (
    <div>
      <FactBox
        fact={currentFact}
        setFavorite={setFavorite}
        isFavorite={false}
        fromPage={fromPage}
      />
      <Controls>
        <ControlButton title="Previous" handleClick={openPreviousFact} />
        <ControlButton title="Next" handleClick={openNextFact} />
      </Controls>
    </div>
  );
};
