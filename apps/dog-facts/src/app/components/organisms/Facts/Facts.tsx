import { useState, Dispatch, SetStateAction } from 'react';

import FactBox from '../../molecules/FactBox';
import ControlButton from '../../atomic/ControlButton';

import { IFactFavorites, IFact } from '../../../app';

import styled from '@emotion/styled';

const Controls = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

interface Props {
  setFavorite: Dispatch<SetStateAction<IFactFavorites>>;
  facts: IFact[];
}

export const Facts = ({ setFavorite, facts }: Props) => {
  const [activeFactId, setActiveFactId] = useState(0);

  const handleNextEdge = (nextId: number, edge: number) => {
    if (facts[nextId]) {
      setActiveFactId(nextId);
    } else {
      setActiveFactId(edge);
    }
  };

  const openNextFact = () => {
    handleNextEdge(activeFactId + 1, 0);
  };

  const openPreviousFact = () => {
    handleNextEdge(activeFactId - 1, facts.length - 1);
  };

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
      />
      <Controls>
        <ControlButton title="Previous" handleClick={openPreviousFact} />
        <ControlButton title="Next" handleClick={openNextFact} />
      </Controls>
    </div>
  );
};
