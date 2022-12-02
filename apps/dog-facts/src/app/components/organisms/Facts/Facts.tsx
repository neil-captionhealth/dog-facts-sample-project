import { useState, Dispatch, SetStateAction } from 'react';

import FactBox from '../../molecules/FactBox';
import ControlButton from '../../atomic/ControlButton';

import { IFactFavorites } from '../../../app';

import styled from '@emotion/styled';

const Controls = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

interface Props {
  favorites: IFactFavorites;
  setFavorite: Dispatch<SetStateAction<IFactFavorites>>;
}

export interface IFact {
  id: number;
  description: string;
}

export const Facts = ({ favorites, setFavorite }: Props) => {
  const mockedData = [
    {
      id: 0,
      description:
        'All dogs can be traced back 40 million years ago to a weasel-like animal called the Miacis which dwelled in trees and dens. The Miacis later evolved into the Tomarctus, a direct forbear of the genus Canis, which includes the wolf and jackal as well as the dog.',
    },
    {
      id: 1,
      description:
        'Ancient Egyptians revered their dogs. When a pet dog would die, the owners shaved off their eyebrows, smeared mud in their hair, and mourned aloud for days.',
    },
  ];
  const [facts, setFacts] = useState<IFact[]>(mockedData);
  const [activeFactId, setActiveFactId] = useState(0);

  const openNextFact = () => setActiveFactId(activeFactId + 1);
  const openPreviousFact = () => setActiveFactId(activeFactId - 1);

  const currentFact = facts[activeFactId];
  console.log(currentFact, 'currentFact');

  return (
    <div>
      <FactBox
        fact={currentFact}
        setFavorite={setFavorite}
        isFavorite={favorites[currentFact.id]?.isFavorite}
      />
      <Controls>
        <ControlButton title="Previous" handleClick={openPreviousFact} />
        <ControlButton title="Next" handleClick={openNextFact} />
      </Controls>
    </div>
  );
};
