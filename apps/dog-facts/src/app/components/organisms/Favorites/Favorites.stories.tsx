import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Favorites } from './Favorites';

import { favorites } from './__tests__/mocks';

const Story: ComponentMeta<typeof Favorites> = {
  component: Favorites,
  title: 'Favorites',
  argTypes: {
    setFavorite: {
      action: 'this favorite will be removed',
    },
  },
};
export default Story;

const Template: ComponentStory<typeof Favorites> = (args) => (
  <Favorites {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  favorites: {},
};

export const Filled = Template.bind({});
Filled.args = {
  favorites,
};
