import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './EyeButton';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'core/FormField/Button',
  args: {
    onTypeChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const EyeButton: Story = {
  render: args => (
    <div className="size-16 rounded-md border-2 border-neutral-90 px-2">
      <div className="relative size-full">{<Button {...args} />}</div>
    </div>
  ),
};
