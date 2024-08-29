import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from 'utils';

//Button variant example
const btnCVA = cva(
  'inline-flex items-center justify-center outline-none rounded-xl focus:outline-none transition active:outline-none focus-visible:outline-none no-underline truncate disabled:opacity-60 disabled:cursor-default',
  {
    variants: {
      variant: {
        default:
          'bg-[rgba(253,225,18,1)] text-black [&:not(:disabled)]:hover:bg-[rgba(255,241,69,1)] [&:not(:disabled)]:hover:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3)] [&:not(:disabled)]:active:bg-[rgba(253,225,18,1)]',
        outline:
          'bg-transparent border border-[rgba(242,203,5,1)] [&:not(:disabled)]:hover:bg-[rgba(244,240,239,1)] [&:not(:disabled)]:hover:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3)] [&:not(:disabled)]:active:bg-transparent',
        elevated: `bg-[rgba(253,225,18,1)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.3)] text-black
          [&:not(:disabled)]:hover:shadow-[0px_2px_2px_0px_rgba(0,0,0,0.6)] [&:not(:disabled)]:active:bg-[rgba(253,225,18,1)],`,
        disabled: 'bg-[rgba(229,229,225,1)] cursor-not-allowed',
      },
      size: {
        default: 'h-[42px] px-6',
        sm: 'h-[42px] px-6',
        lg: 'h-[42px] px-6',
        full: 'h-[42px] px-6 w-full max-w-[100cqw]',
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
