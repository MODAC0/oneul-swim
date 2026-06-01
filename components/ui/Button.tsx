import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/** Figma Components/Button — solid / outline / medium + disabled */
export type ButtonVariant = 'solid' | 'outline' | 'medium';

const BASE =
  'flex w-full items-center justify-center gap-1.5 rounded-button px-4 py-4.5 text-base font-bold transition';

const VARIANT: Record<ButtonVariant, string> = {
  solid: 'bg-primary text-white',
  outline: 'border border-primary text-primary',
  medium: 'bg-[#f2f2f2] text-text',
};

/** 버튼 클래스 — <a>/<Link> 등 비-button 요소에도 동일 스타일 적용용 */
export function buttonClass(
  variant: ButtonVariant = 'solid',
  opts?: { disabled?: boolean },
): string {
  if (opts?.disabled) return cn(BASE, 'cursor-not-allowed bg-[#d1d5db] text-white');
  return cn(BASE, VARIANT[variant]);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = 'solid',
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(buttonClass(variant, { disabled }), className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
