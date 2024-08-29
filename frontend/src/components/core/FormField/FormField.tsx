import { cva } from 'class-variance-authority';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import EyeButton from './EyeButton/EyeButton';
import ResetButton from './ResetButton/ResetButton';

type FormFieldOnActionType = 'clean' | 'password' | 'disabled' | undefined;
type FormFieldType = 'text' | 'email' | 'url' | 'number' | 'password' | 'date' | 'search' | 'tel';

const formFieldCVA = cva(
  'w-full bg-transparent outline-none rounded-md focus:outline-none active:outline-none border border-secundario-99 transition-all duration-300 ease-in-out text-sm peer placeholder:text-secundario-99 placeholder:opacity-0 focus:placeholder:opacity-100 h-12 px-3 py-1 focus:border-secundario-70 [:not(:placeholder-shown)]:border-secundario-70',
  {
    variants: {
      onAction: {
        clean: 'pr-10',
        password: 'pr-10',
        disabled: '',
      },
    },
    defaultVariants: { onAction: 'disabled' },
  }
);

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  onAction?: FormFieldOnActionType;
  'data-testid'?: string;
  type?: FormFieldType;
  onTypeChange?: (updated: 'text' | 'password') => void;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  {
    className = '',
    id = '',
    label = '',
    onAction,
    type = 'text',
    placeholder = '',
    onTypeChange,
    ...props
  },
  ref
) {
  const defaultID = id ? id : crypto.randomUUID();

  return (
    <div className="group relative w-full max-w-lg text-sm">
      <input
        {...props}
        id={defaultID}
        placeholder={placeholder}
        ref={ref}
        type={type}
        className={cn(formFieldCVA({ className }))}
      />
      <label
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-neutral-20 px-2 py-1 text-base text-secundario-99 transition-all duration-500 ease-in-out peer-focus:-top-4 peer-focus:left-3 peer-focus:translate-y-0 peer-focus:scale-[.85] peer-focus:text-secundario-95 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-[.85]"
        htmlFor={defaultID}>
        {label}
      </label>
      {onAction === 'clean' ? <ResetButton inputId={defaultID} /> : null}
      {onAction === 'password' ? <EyeButton onTypeChange={onTypeChange} /> : null}
    </div>
  );
});

export default FormField;
