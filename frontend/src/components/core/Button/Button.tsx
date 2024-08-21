import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from 'utils';

//Button variant example
const btnCVA = cva(
  'inline-flex items-center justify-center outline-none focus:outline-none active:outline-none focus-visible:outline-none no-underline truncate disabled:opacity-60 disabled:cursor-default',
  {
    variants: {
      variant: {
        default:
          'bg-slate-200 text-black [&:not(:disabled)]:hover:bg-slate-300 [&:not(:disabled)]:active:bg-slate-400',
        outline:
          'bg-transparent border border-slate-300 [&:not(:disabled)]:hover:border-slate-300 [&:not(:disabled)]:active:border-slate-400',
      },
      size: {
        default: 'h-9 px-4 ',
        sm: 'h-9 px-1',
        lg: 'h-9 py-1 px-8',
        full: 'h-9 px-2 w-full max-w-[100cqw]',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof btnCVA> {
  'data-testid'?: string;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(btnCVA({ variant, size, className }))} ref={ref} {...props} />;
});

export default Button;
