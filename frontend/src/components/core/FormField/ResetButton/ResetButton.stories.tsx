import type { Meta, StoryObj } from '@storybook/react';
import Button from './ResetButton';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'core/FormField/Button',
  argTypes: {
    inputId: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const ResetButton: Story = {
  render: args => (
    <div className="size-16 rounded-md border-2 border-neutral-90 px-2">
      <div className="relative size-full">{<Button {...args} />}</div>
    </div>
  ),
};
