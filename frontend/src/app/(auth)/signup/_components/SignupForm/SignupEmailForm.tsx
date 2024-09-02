'use client';

import { type FormEvent, useTransition } from 'react';
import { useFormState } from 'react-dom';
import Button from '@/components/core/Button/Button';
import FormField from '@/components/core/FormField/FormField';
import { signupStepOne } from '../../actions';

const SignupEmailForm = () => {
  const [_result, dispatch] = useFormState(signupStepOne, undefined);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
  };

  return (
    <form
      data-testid="form-signup-email"
      className="mb-5 flex flex-col gap-y-5"
      onSubmit={handleSubmit}>
      <h2 className="text-3xl font-semibold leading-10" tabIndex={2}>
        Crea tu cuenta
      </h2>
      <FormField
        id="email-field"
        name="emailField"
        data-testid="email-field"
        onAction="clean"
        type="email"
        label="Correo Electronico"
        autoComplete="email"
        tabIndex={4}
      />

      <Button tabIndex={6} type="submit" size="full" disabled={!!isPending}>
        Crear cuenta
      </Button>
    </form>
  );
};

export default SignupEmailForm;
