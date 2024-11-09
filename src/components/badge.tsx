import clsx from 'clsx';
import { cloneElement, isValidElement } from 'react';

import { SvgInfoCircle } from './icons';

type BadgeProps = {
  children?: React.ReactNode;
  iconLeft?:
    | React.ReactElement<React.HTMLAttributes<SVGSVGElement>>
    | 'info-circle';
  iconRight?:
    | React.ReactElement<React.HTMLAttributes<SVGSVGElement>>
    | 'info-circle';
  size?: 'small' | 'large';
  color?: 'green' | 'orange' | 'red' | 'gray';
  className?: string;
};

export const Badge = ({
  children,
  iconLeft,
  iconRight,
  size = 'large',
  color = 'gray',
  className = '',
}: BadgeProps) => {
  const iconClassName = clsx(
    'aspect-square',
    {
      'w-4': size === 'large',
      'h-3': size === 'small',

      'text-neutral-900': color === 'gray',
      'text-success-text': color === 'green',
      'text-warning-text': color === 'orange',
      'text-error-text': color === 'red',
    },
    className
  );

  return (
    <div
      className={clsx(
        'inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-full',
        {
          'px-2 py-1 text-cap-xs': size === 'large',
          'px-1 py-0.5 text-cap-xxs': size === 'small',

          'bg-neutral-300 text-neutral-900': color === 'gray',
          'bg-success-bg text-success-text': color === 'green',
          'bg-warning-bg text-warning-text': color === 'orange',
          'bg-error-bg text-error-text': color === 'red',
        },
        className
      )}
    >
      {'info-circle' === iconLeft && (
        <SvgInfoCircle aria-hidden className={iconClassName} />
      )}
      {typeof iconLeft !== 'string' &&
        isValidElement(iconLeft) &&
        cloneElement(iconLeft, {
          title: '',
          'aria-hidden': true,
          className: clsx(iconClassName, iconLeft.props.className),
        })}
      {children}
      {'info-circle' === iconRight && (
        <SvgInfoCircle aria-hidden className={iconClassName} />
      )}
      {typeof iconRight !== 'string' &&
        isValidElement(iconRight) &&
        cloneElement(iconRight, {
          title: '',
          'aria-hidden': true,
          className: clsx(iconClassName, iconRight.props.className),
        })}
    </div>
  );
};
