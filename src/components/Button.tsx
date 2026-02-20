'use client';

import React, { ReactElement, type ReactNode } from 'react';
import { type IconType } from 'react-icons/lib';
import { type Link } from '@payloadcms/ui';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'wide' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  label?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  link?: string;
}

const Button = ({
  variant = 'default',
  size = 'default',
  disabled = false,
  label = '',
  className = '',
  startIcon: StartIcon,
  endIcon: EndIcon,
  link = '/',
  onClick,
  ...props
}: ButtonProps) => {
  const variantStyles = {
    default: 'bg-primary text-white hover:bg-primary/90 text-base',
    wide: 'bg-primary text-white hover:bg-primary/90 text-sm w-full',
    outline: 'border hover:bg-accent',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-secondary ',
    link: 'text-primary underline-offset-4 hover:underline',
  };

  const sizeStyles = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md gap-1.5 px-3',
    lg: 'h-10 rounded-md px-6',
    icon: 'size-9 rounded-md',
  };

  const variantClass = variantStyles[variant as keyof typeof variantStyles];
  const sizeClass = sizeStyles[size as keyof typeof sizeStyles];

  const baseStyles =
    'flex items-center justify-center font-normal px-3 py-2 rounded-lg transition-colors';
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  const buttonClasses = `${baseStyles} ${variantClass} ${sizeClass} ${disabledStyles} ${className}`;

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick || (() => (window.location.href = link))}
      {...props}
    >
      {StartIcon && <span className="mr-2">{StartIcon}</span>}
      {label}
      {EndIcon && <span className="ml-2">{EndIcon}</span>}
    </button>
  );
};

export default Button;
