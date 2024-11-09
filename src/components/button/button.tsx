'use client';

import clsx from 'clsx';
import { cloneElement, forwardRef, isValidElement } from 'react';

import { PolymorphicComponentPropWithRef, PolymorphicRef } from '@/types';

import { SvgArrowLeft, SvgArrowRight } from '../icons';

type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant =
  | 'primary-dark'
  | 'primary-light'
  | 'secondary-dark'
  | 'secondary-light';

type Props<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    iconLeft?:
      | React.ReactElement<React.HTMLAttributes<SVGSVGElement>>
      | 'arrow-left';
    iconRight?:
      | React.ReactElement<React.HTMLAttributes<SVGSVGElement>>
      | 'arrow-right';
    dangerousIconLeft?: JSX.Element;
    className?: string;
    noWrap?: boolean;
    stretch?: boolean;
  }
>;

type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: Props<C>,
  ref: PolymorphicRef<C>
) => React.ReactNode;

export const Button: ButtonComponent = forwardRef(function Button<
  C extends React.ElementType = 'button',
>(
  {
    as,
    variant = 'primary-dark',
    size = 'md',
    stretch = false,
    noWrap = false,
    disabled = false,
    iconLeft,
    iconRight,
    children,
    dangerousIconLeft,
    className = '',
    ...props
  }: Props<C>,
  ref: PolymorphicRef<C>
) {
  const Component = as || 'button';

  const iconClassName = clsx(
    'inline-flex aspect-square shrink-0 text-neutral-000 duration-300',
    {
      'rounded-1 w-5.5 h-5.5 p-0.75': size === 'sm',
      'rounded-1.5 w-7 h-7 p-0.75': size === 'md',
      'rounded-2 w-8 h-8 p-1': size === 'lg',

      'group-hover:text-primary-600 bg-neutral-000 text-primary-500':
        variant === 'primary-dark' && !disabled,
      'text-neutral-000 bg-primary-500':
        (variant === 'primary-light' || variant === 'secondary-dark') &&
        !disabled,

      'bg-neutral-000 text-primary-600 group-hover:bg-primary-500 group-hover:text-neutral-000':
        variant === 'secondary-light' && !disabled,

      'text-neutral-500 bg-neutral-100':
        (variant === 'primary-dark' || variant === 'primary-light') && disabled,

      'text-neutral-300 bg-neutral-500':
        variant === ('secondary-dark' || 'secndary-light') && disabled,
    }
  );

  return (
    <Component
      className={clsx(
        'group inline-flex shrink-0 cursor-pointer items-center outline-none duration-300',
        {
          'w-full': stretch,
          'whitespace-nowrap': noWrap,
          'cursor-not-allowed': disabled,

          'gap-1.75 rounded-2 h-9 px-1.75': size === 'sm',
          'gap-2.5 rounded-3 h-12 px-2.5': size === 'md',
          'gap-2.75 rounded-4 h-14 px-3': size === 'lg',

          'text-neutral-000 bg-primary-500 hover:bg-primary-600 border border-primary-500 hover:border-primary-600':
            variant === 'primary-dark' && !disabled,
          'text-primary-600 bg-neutral-000 hover:bg-primary-200 border border-neutral-000 hover:border-primary-200':
            variant === 'primary-light' && !disabled,

          'text-primary-600 hover:bg-primary-200 border border-primary-200':
            variant === 'secondary-dark' && !disabled,
          'text-neutral-000 hover:bg-neutral-000 hover:text-primary-600 border border-neutral-000':
            variant === 'secondary-light' && !disabled,

          'text-neutral-500 bg-neutral-300':
            (variant === 'primary-dark' || variant === 'primary-light') &&
            disabled,

          'focus-visible:focus-style-dark': variant.includes('dark'),
          'focus-visible:focus-style-light': variant.includes('light'),

          'text-neutral-500 border border-neutral-300':
            variant === ('secondary-dark' || 'secndary-light') && disabled,
        },
        className
      )}
      {...props}
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {iconLeft === 'arrow-left' && (
        <SvgArrowLeft aria-hidden className={iconClassName} />
      )}
      {dangerousIconLeft &&
        cloneElement(dangerousIconLeft, {
          title: '',
          'aria-hidden': true,
          className: clsx(iconClassName),
        })}
      {typeof iconLeft !== 'string' &&
        isValidElement(iconLeft) &&
        cloneElement(iconLeft, {
          title: '',
          'aria-hidden': true,
          className: clsx(iconClassName, iconLeft.props.className),
        })}
      <div className="w-full text-center"> {children}</div>
      {'arrow-right' === iconRight && (
        <SvgArrowRight aria-hidden className={iconClassName} />
      )}
      {typeof iconRight !== 'string' &&
        isValidElement(iconRight) &&
        cloneElement(iconRight, {
          title: '',
          'aria-hidden': true,
          className: clsx(iconClassName, iconRight.props.className),
        })}
    </Component>
  );
});

export default Button;
