import type { Meta, StoryObj } from '@storybook/react';
import Field from './PasswordFormField';

const meta: Meta<typeof Field> = {
  component: Field,
  title: 'core/FormField/PasswordField',
  args: {
    label: 'Passowrd',
    'data-testid': 'form-passwordfield',
    type: 'password',
    id: 'password-field-id',
    placeholder: '',
  },
  argTypes: {
    type: {
      options: ['text', 'password'],
      control: { type: 'select' },
    },
    id: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    jest: ['PasswordField.test.tsx'],
  },
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: args => <Field {...args} />,
};
