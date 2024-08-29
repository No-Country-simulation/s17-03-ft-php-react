'use client';

import Image from 'next/image';
import { useState } from 'react';

interface EyeButtonProps {
  onTypeChange?: (type: 'text' | 'password') => void;
}

const EyeButton = ({ onTypeChange }: EyeButtonProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const onReset = () => {
    onTypeChange?.(!showPassword ? 'text' : 'password');
    setShowPassword(prev => !prev);
  };

  return (
    <button
      onClick={onReset}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-99 transition-all duration-300 ease-in-out hover:text-secundario-90"
      data-testid="eye-button">
      {!showPassword ? (
        <Image
          src="/icons/EyeHiddeIcon.svg"
          width={18}
          height={18}
          alt="Eye icon"
          loading="eager"
        />
      ) : (
        <svg height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
          <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
        </svg>
      )}
    </button>
  );
};

export default EyeButton;
