import type { Meta, StoryObj } from '@storybook/react';
import FormField from './FormField';

const meta: Meta<typeof FormField> = {
  component: FormField,
  title: 'core/FormField/TextField',
  args: {
    label: 'Email',
    'data-testid': 'form-textfield',
    type: 'text',
    onAction: 'disabled',
    placeholder: '',
    id: 'text-field-id',
  },
  argTypes: {
    type: {
      options: ['text', 'email', 'url', 'number', 'password', 'date', 'search', 'tel'],
      control: { type: 'select' },
    },
    id: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    onAction: {
      options: ['clean', 'password', 'disabled'],
      control: { type: 'select' },
    },
    label: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Label',
  },

  render: args => <FormField {...args} />,
};

export const TextFieldWithClean: Story = {
  args: {
    label: 'With Clean',
    onAction: 'clean',
  },

  render: args => <FormField {...args} />,
};

export const TextFieldWithValue: Story = {
  args: {
    label: 'Active',
    value: 'Active',
  },
  render: args => <FormField {...args} />,
};
