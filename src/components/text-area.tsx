import clsx from 'clsx';
import { forwardRef, useId, useImperativeHandle, useRef } from 'react';

type TextAreaSize = 'sm' | 'md' | 'lg';
export type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'placeholder' | 'size'
> & {
  id?: string;
  name?: string;
  size?: TextAreaSize;
  placeholder?: string;
  value?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
};

export const TextArea = forwardRef(function Input(
  {
    id: initialId,
    name,
    rows,
    cols,
    placeholder = '',
    value,
    size = 'md',
    className,
    disabled,
    error,
    ...props
  }: TextAreaProps,
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>
) {
  const uniqueId = useId();
  const inputId = initialId || uniqueId;
  const errorId = useId();

  const ref = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLTextAreaElement);

  return (
    <div className={clsx('relative', className)}>
      <div>
        <textarea
          rows={rows}
          cols={cols}
          ref={ref}
          id={inputId}
          name={name}
          aria-describedby={errorId}
          className={clsx(
            'min-h-[140px] w-full truncate border border-neutral-700 bg-neutral-000 text-neutral-900 placeholder:text-neutral-700 focus-visible:focus-style-dark',
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
          placeholder={placeholder}
        />
      </div>
      {error && <p className="mt-1 text-p-reg-sm text-primary-500">{error}</p>}
    </div>
  );
});

export default TextArea;
