import clsx from 'clsx';
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  useImperativeHandle,
  useRef,
} from 'react';

import { SvgSearch } from './icons';

type TextInputSize = 'sm' | 'md' | 'lg';
export type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'placeholder' | 'size'
> & {
  id?: string;
  name?: string;
  size?: TextInputSize;
  placeholder?: string;
  value?: string;
  iconButton?: React.ReactNode;
  error?: string;
  className?: string;
  iconLeft?: React.ReactElement<React.HTMLAttributes<SVGSVGElement>> | 'search';
};

export const TextInput = forwardRef(function Input(
  {
    id: initialId,
    name,
    placeholder = '',
    value,
    type = 'text',
    size = 'md',
    iconLeft,
    iconButton,
    className,
    disabled,
    error,
    ...props
  }: TextInputProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>
) {
  const uniqueId = useId();
  const inputId = initialId || uniqueId;
  const errorId = useId();

  const ref = useRef<HTMLInputElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement);

  const iconClassName = clsx('absolute left-4 top-1/2 -translate-y-1/2', {
    'w-3 h-3': size === 'sm',
    'w-4 h-4': size === 'md',
    'w-5 h-5': size === 'lg',
  });

  return (
    <div className={clsx('relative', className)}>
      <div>
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          aria-describedby={errorId}
          className={clsx(
            'w-full truncate border border-neutral-700 bg-neutral-000 text-neutral-900 placeholder:text-neutral-700 focus-visible:focus-style-dark',
            {
              'bg-neutral-100 cursor-not-allowed text-neutral-700 border-neutral-500':
                disabled,

              'py-1.5 h-9 px-2 rounded-2 text-p-reg-sm': size === 'sm',
              'py-2 px-3 h-12 rounded-3 text-p-reg-base': size === 'md',
              'py-3 h-14 px-4  rounded-4 text-p-reg-base': size === 'lg',
              'pl-3': !iconLeft,
              'pl-9': iconLeft && size === 'sm',
              'pl-10': iconLeft && size === 'md',
              'pl-12': iconLeft && size === 'lg',
              'pr-2': !iconButton,
              'pr-13 lg:pr-10': iconButton,
            }
          )}
          disabled={disabled}
          value={value}
          {...props}
          placeholder={placeholder}
        />
        {iconLeft === 'search' && (
          <SvgSearch aria-hidden className={iconClassName} />
        )}

        {typeof iconLeft !== 'string' &&
          isValidElement(iconLeft) &&
          cloneElement(iconLeft, {
            title: '',
            'aria-hidden': true,
            className: clsx(iconClassName, iconLeft.props.className),
          })}
        {iconButton && (
          <div
            className={clsx('absolute right-1.5', {
              'top-[18px]': size === 'lg',
              'top-1.5': size !== 'lg',
            })}
          >
            {iconButton}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-p-reg-sm text-primary-500">{error}</p>}
    </div>
  );
});

export default TextInput;
