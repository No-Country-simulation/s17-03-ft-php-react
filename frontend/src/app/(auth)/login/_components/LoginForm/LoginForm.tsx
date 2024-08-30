import Button from '@/components/core/Button/Button';
import FormField from '@/components/core/FormField/FormField';
import PasswordFormField from '@/components/core/PasswordFormField/PasswordFormField';

const LoginForm = () => {
  return (
    <form data-testid="form-login" className="mb-5 flex flex-col gap-y-5">
      <h2 className="text-3xl font-semibold leading-10" tabIndex={2}>
        Iniciar Sesion
      </h2>
      <FormField
        id="email-field"
        data-testid="email-field"
        onAction="clean"
        type="email"
        label="Correo Electronico"
        autoComplete="email"
        tabIndex={3}
      />
      <PasswordFormField
        tabIndex={4}
        id="password-field"
        data-testid="password-field"
        label="Contraseña"
        autoComplete="off"
      />
      <Button tabIndex={5} type="submit" size="full">
        Continuar
      </Button>
    </form>
  );
};

export default LoginForm;
