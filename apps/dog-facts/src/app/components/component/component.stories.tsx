import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Component } from './component';

const Story: ComponentMeta<typeof Component> = {
  component: Component,
  title: 'Component',
};
export default Story;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
