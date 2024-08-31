'use client';

interface ResetButtonProps {
  inputId: string;
}

const CrossIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.43873 0.418419C1.88083 -0.139473 0.976312 -0.139473 0.418419 0.418419C-0.139473 0.976312 -0.139473 1.88083 0.418419 2.43873L7.97971 10L0.418419 17.5613C-0.139473 18.1192 -0.139473 19.0237 0.418419 19.5816C0.976312 20.1395 1.88083 20.1395 2.43873 19.5816L10 12.0203L17.5613 19.5816C18.1192 20.1395 19.0237 20.1395 19.5816 19.5816C20.1395 19.0237 20.1395 18.1192 19.5816 17.5613L12.0203 10L19.5816 2.43873C20.1395 1.88083 20.1395 0.976312 19.5816 0.418419C19.0237 -0.139473 18.1192 -0.139473 17.5613 0.418419L10 7.97971L2.43873 0.418419Z"
      fill="currentColor"
    />
  </svg>
);

const ResetButton = ({ inputId }: ResetButtonProps) => {
  const onReset = () => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };
  return (
    <button
      type="button"
      onClick={onReset}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-99 transition-all duration-300 ease-in-out hover:text-error-60"
      data-testid="reset-button"
      aria-label="Borrar texto">
      <CrossIcon />
    </button>
  );
};

export default ResetButton;
