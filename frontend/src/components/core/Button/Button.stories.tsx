import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'core/Button',
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      options: ['default', 'outline'],
      control: { type: 'select' },
    },
    size: {
      options: ['default', 'sm', 'lg', 'full'],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: args => <Button {...args} />,
  args: {
    'data-testid': 'button-default-story',
    children: 'Button',
  },
  parameters: {
    jest: ['Button.test.tsx'],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
    const button = canvas.getByTestId('button-default-story');
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass('bg-slate-200');
  },
};

export const Outline: Story = {
  render: args => <Button {...args} />,
  args: {
    'data-testid': 'button-outline-story',
    children: 'Button',
    variant: 'outline',
  },
  parameters: {
    jest: ['Button.test.tsx'],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('button-outline-story');
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass('bg-transparent');
  },
};
