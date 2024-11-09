'use client';

import clsx from 'clsx';
import { cloneElement, forwardRef, isValidElement } from 'react';

import { PolymorphicComponentPropWithRef, PolymorphicRef } from '@/types';

import { SvgArrowLeft, SvgArrowRight } from '../icons';

export type AnchorSize = 'sm' | 'md' | 'lg' | 'none';
export type AnchorVariant =
  | 'primary-light'
  | 'primary-dark'
  | 'secondary-light'
  | 'secondary-dark';

export type AnchorProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      size?: AnchorSize;
      disabled?: boolean;
      noWrap?: boolean;
      iconLeft?:
        | React.ReactElement<React.HTMLAttributes<SVGSVGElement>>
        | 'arrow-left';
      iconRight?:
        | React.ReactElement<React.HTMLAttributes<SVGSVGElement>>
        | 'arrow-right';
      stretch?: boolean;
      variant?: AnchorVariant;
      className?: string;
      inverseUnderline?: boolean;
    }
  >;

// type AnchorComponent = <C extends React.ElementType = 'a'>(
//   props: AnchorProps<C>,
//   ref: PolymorphicRef<C>
// ) => React.ReactNode;

export const Anchor = forwardRef(function Anchor<
  C extends React.ElementType = 'a',
>(
  {
    as,
    size = 'md',
    disabled = false,
    iconLeft,
    iconRight,
    stretch = false,
    noWrap = false,
    variant = 'primary-dark',
    inverseUnderline = false,
    children,
    className,
    ...props
  }: AnchorProps<C>,
  ref: PolymorphicRef<C>
) {
  const Component = as || 'a';

  const iconClassName = clsx(
    'inline-block shrink-0  text-neutral-000 duration-300',
    {
      'text-neutral-500': disabled,

      'h-3 w-3': size === 'sm',
      'h-4 w-4': size === 'md',
      'h-5 w-5': size === 'lg',

      'text-primary-600 group-hover:text-neutral-900':
        variant === 'primary-dark' && !disabled,

      'text-neutral-000 group-hover:text-primary-200':
        variant === 'primary-light' && !disabled,

      'text-neutral-900 group-hover:text-primary-500':
        variant === 'secondary-dark' && !disabled,

      'text-primary-200': variant === 'secondary-light' && !disabled,
    }
  );

  return (
    <Component
      ref={ref}
      className={clsx(
        'group inline-flex items-center whitespace-nowrap outline-none duration-300',

        {
          'hover:underline': inverseUnderline,
          'underline hover:no-underline': !inverseUnderline,
          'w-full': stretch,
          'whitespace-nowrap': noWrap,
          'cursor-not-allowed text-neutral-500': disabled,
          'cursor-pointer': !disabled,

          'text-p-bld-link-sm gap-0.5': size === 'sm',
          'text-p-bld-link-base ap-1': size === 'md',
          'text-p-bld-link-md gap-1.5': size === 'lg',

          'text-primary-600 hover:text-neutral-900':
            variant === 'primary-dark' && !disabled,

          'text-neutral-000 hover:text-primary-200':
            variant === 'primary-light' && !disabled,

          'text-neutral-900 hover:text-primary-500':
            variant === 'secondary-dark' && !disabled,

          'text-primary-200': variant === 'secondary-light' && !disabled,

          'focus-visible:focus-style-dark': variant.includes('light'),
          'focus-visible:focus-style-light': variant.includes('dark'),
        },
        className
      )}
      {...props}
    >
      {iconLeft === 'arrow-left' && (
        <SvgArrowLeft aria-hidden className={iconClassName} />
      )}
      {typeof iconLeft !== 'string' &&
        isValidElement(iconLeft) &&
        cloneElement(iconLeft, {
          title: '',
          'aria-hidden': true,
          className: clsx(iconClassName, iconLeft.props.className),
        })}
      {children}
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

export default Anchor;
