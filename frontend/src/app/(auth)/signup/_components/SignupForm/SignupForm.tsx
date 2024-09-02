'use client';

import { type FormEvent, useTransition } from 'react';
import { useFormState } from 'react-dom';
import Button from '@/components/core/Button/Button';
import FormField from '@/components/core/FormField/FormField';
import PasswordFormField from '@/components/core/PasswordFormField/PasswordFormField';
import { signupStepTwo } from '../../actions';

const SignupForm = ({ email }: { email?: string }) => {
  const [_result, dispatch] = useFormState(signupStepTwo, undefined);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
  };
  return (
    <form
      data-testid="form-signup"
      className="after-bright-blue relative mb-4 flex h-full flex-col gap-y-5 after:bottom-[-20%] after:left-0"
      onSubmit={handleSubmit}>
      <FormField
        id="name-field"
        name="nameField"
        data-testid="name-field"
        onAction="clean"
        type="text"
        label="Nombre y Apellido"
        autoComplete="fullname"
        tabIndex={2}
      />
      <FormField
        id="brithdate-field"
        name="brithdateField"
        data-testid="brithdate-field"
        onAction="clean"
        type="date"
        label="Fecha de nacimiento"
        autoComplete="off"
        tabIndex={3}
      />

      <FormField
        id="email-field"
        name="emailField"
        data-testid="email-field"
        onAction="clean"
        type="email"
        label="Correo Electronico"
        autoComplete="email"
        defaultValue={email ? decodeURIComponent(email) : ''}
        tabIndex={4}
      />
      <PasswordFormField
        tabIndex={5}
        id="password-field"
        name="passwordField"
        data-testid="password-field"
        label="Contraseña"
        autoComplete="off"
      />

      <Button tabIndex={6} type="submit" size="full" disabled={isPending} className="mb-5 mt-auto">
        Estoy de acuerdo, continuar
      </Button>
    </form>
  );
};

export default SignupForm;
