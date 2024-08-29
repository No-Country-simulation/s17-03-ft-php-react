'use client';

import { forwardRef, type InputHTMLAttributes, useState } from 'react';
import FormField from '../FormField/FormField';

type PasswordFormFieldType = 'text' | 'password';

interface PasswordFormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  'data-testid'?: string;
  type?: PasswordFormFieldType;
}

const PasswordFormField = forwardRef<HTMLInputElement, PasswordFormFieldProps>(
  function FormFieldFacade({ type = 'password', ...props }, ref) {
    const [inputType, setInputType] = useState<PasswordFormFieldType>(type);

    const handleTypeChange = (updatedType: PasswordFormFieldType) => {
      setInputType(updatedType);
    };

    return (
      <FormField
        {...props}
        ref={ref}
        type={inputType}
        onAction={'password'}
        onTypeChange={handleTypeChange}
      />
    );
  }
);

export default PasswordFormField;
