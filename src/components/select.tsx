import clsx from 'clsx';
import { forwardRef, useId, useImperativeHandle, useRef } from 'react';

type SelectInputSize = 'sm' | 'md' | 'lg';
export type SelectInputProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'placeholder' | 'size'
> & {
  id?: string;
  name?: string;
  size?: SelectInputSize;
  placeholder?: string;
  value?: string;
  options: { label: string; value: string }[];
  className?: string;
  error?: string;
};

export const SelectInput = forwardRef(function Select(
  {
    id: initialId,
    name,
    placeholder = '',
    value,
    options,
    size = 'md',
    className,
    disabled,
    error,
    ...props
  }: SelectInputProps,
  forwardedRef: React.ForwardedRef<HTMLSelectElement>
) {
  const uniqueId = useId();
  const selectId = initialId || uniqueId;

  const ref = useRef<HTMLSelectElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLSelectElement);

  return (
    <div className={clsx('relative', className)}>
      <select
        ref={ref}
        id={selectId}
        name={name}
        className={clsx(
          'w-full truncate border border-neutral-700 bg-neutral-000 text-neutral-900 placeholder:text-neutral-700 focus-visible:focus-style-dark',
          {
            'bg-neutral-100 cursor-not-allowed text-neutral-700 border-neutral-500':
              disabled,

            'py-1.5 h-9 px-2 rounded-2 text-p-reg-sm': size === 'sm',
            'py-2 px-3 h-12 rounded-3 text-p-reg-base': size === 'md',
            'py-3 h-14 px-4 rounded-4 text-p-reg-base': size === 'lg',
          }
        )}
        disabled={disabled}
        value={value}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-p-reg-sm text-primary-500">{error}</p>}
    </div>
  );
});

export default SelectInput;
