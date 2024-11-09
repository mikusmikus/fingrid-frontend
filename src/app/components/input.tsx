import classnames from 'classnames';
import React, { useState } from 'react';

import {
  CheckIcon,
  CloseRemoveXIcon,
  ExclamationIcon,
  InfoAltIcon,
  WarningIcon,
} from './icons/icons';

type Props = {
  label?: string;
  placeholder?: string;
  postfix?: string;
  value?: string;
  errorMsg?: string; // @deprecated: Use `message` in stead.
  message?: string;
  showMessage?: boolean;
  hasError?: boolean;
  kind?: 'default' | 'info' | 'success' | 'danger' | 'warning';
  containerClassName?: string;
  small?: boolean;
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      placeholder,
      value,
      postfix,
      onChange,
      onClear,
      containerClassName,
      className,
      hasError = false,
      errorMsg,
      disabled,
      icon,
      type = 'text',
      kind = 'default',
      small,
      message,
      showMessage = false,
      readOnly,
      ...rest
    }: Props,
    ref
  ) => {
    const [_isValid, setIsValid] = useState(true);
    const [floatingLabel, setFloatingLabel] = useState(false);
    const isValid = _isValid && !hasError;
    const ContainerElement = label ? 'label' : 'div';

    function getMessageIcon() {
      if (kind === 'info' || kind === 'default')
        return <InfoAltIcon size={2} />;
      if (kind === 'success') return <CheckIcon size={2} />;
      if (kind === 'danger') return <ExclamationIcon size={2} />;
      if (kind === 'warning') return <WarningIcon size={2} />;
    }

    return (
      <div>
        <ContainerElement
          className={classnames(
            containerClassName,
            'relative flex items-center rounded border text-text-800',
            {
              'p-3': label,
              'px-2 py-1.5': !label,
            },
            {
              'h-[38px]': small,
              'h-12': !small,
            },
            {
              'hover:ring-1': !readOnly,

              // Default or Info
              'border-primary-600 bg-primary-100 focus-within:border-primary-700  focus-within:bg-primary-300 hover:border-primary-800 hover:ring-primary-800':
                (kind === 'default' || kind === 'info') &&
                !disabled &&
                !readOnly,

              // Danger
              'border-danger-500 bg-danger-100 hover:border-danger-800 hover:ring-danger-300':
                (!isValid && !disabled && !readOnly) || kind === 'danger',

              // Success
              'border-success-500 bg-success-100 hover:border-success-800 hover:ring-success-300':
                kind === 'success' && !disabled && !readOnly,

              // Warning
              'border-warning-500 bg-warning-100 hover:border-warning-800 hover:ring-warning-300':
                kind === 'warning' && !disabled && !readOnly,

              'border-neutral-500 bg-neutral-300 text-text-700':
                disabled || readOnly,

              'pl-10': Boolean(icon),
            }
          )}
        >
          {icon ? (
            <span
              className={classnames('absolute left-2', {
                'text-text-primary': kind === 'info' && !disabled,
                'text-text-success': kind === 'success' && !disabled,
                'text-text-warning': kind === 'warning' && !disabled,
                'text-text-danger': kind === 'danger' && !disabled,
              })}
            >
              {icon}
            </span>
          ) : null}

          {label !== undefined ? (
            <span
              className={classnames(
                'absolute block overflow-hidden truncate leading-hd transition-all',
                {
                  'text-xs font-medium': floatingLabel,
                  '-translate-y-3 ': floatingLabel && !small,
                  '-translate-y-2 ': floatingLabel && small,
                  'text-text-700': disabled,
                  'text-base': !floatingLabel,

                  'max-w-[calc(100%-24px)]': !icon,
                  'max-w-[calc(100%-52px)]': icon && !floatingLabel,
                  'max-w-[calc(100%-76px)]': icon && floatingLabel,
                  'text-danger': !disabled && kind === 'danger',
                  'text-success': !disabled && kind === 'success',
                  'text-text-800':
                    !disabled && (kind === 'info' || kind === 'warning'),
                }
              )}
            >
              {label}
            </span>
          ) : null}

          <input
            ref={(el) => {
              if (ref) {
                if (typeof ref === 'function') {
                  ref(el);
                } else {
                  ref.current = el;
                }
              }

              if (el?.value || el?.placeholder) {
                setFloatingLabel(true);
              }

              setIsValid(el?.validity?.valid ?? true);
            }}
            type={type}
            onFocus={() => {
              setFloatingLabel(true);
            }}
            onBlur={(e) => {
              if (!e.currentTarget.value) {
                setFloatingLabel(false);
              }
            }}
            className={classnames(
              className,
              'relative w-full border-none bg-transparent font-sans text-base leading-hd transition-transform autofill:bg-transparent focus:outline-none',
              {
                'translate-y-2': label && floatingLabel,
                'text-text-700': disabled,
              }
            )}
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              if (onChange) {
                onChange(e);
              }

              setIsValid(e.currentTarget.validity.valid);
            }}
            {...rest}
          />

          {postfix ? (
            <span className="text-sm font-semibold text-primary">
              {postfix}
            </span>
          ) : null}

          {onClear && !disabled && !!value ? (
            <button
              className="rounded bg-primary-100 focus:outline-none focus:ring"
              aria-label="Tøm felt"
              onClick={onClear}
            >
              <CloseRemoveXIcon size={6} className="text-primary" />
            </button>
          ) : null}
        </ContainerElement>

        {errorMsg && !isValid ? (
          <div className="mt-1 flex items-start space-x-1 text-xs font-medium text-danger">
            <span className="flex h-5 shrink-0 items-start">
              <span className="grid size-[14px] place-items-center rounded-full bg-danger text-white">
                <ExclamationIcon size={2} />
              </span>
            </span>
            <span className="font-semibold">{errorMsg}</span>
          </div>
        ) : null}

        {message && showMessage ? (
          <div
            className={classnames(
              'mt-2 flex items-start space-x-1 text-xs font-medium',
              {
                'text-text-success': kind === 'success',
                'text-text-warning': kind === 'warning',
                'text-text-danger': kind === 'danger',
                'text-text-primary': kind === 'info',
              }
            )}
          >
            <span className="flex shrink-0 items-center">
              <span
                className={classnames(
                  'grid size-[14px] place-items-center rounded-full text-white',
                  {
                    'bg-success': kind === 'success',
                    'bg-warning': kind === 'warning',
                    'bg-danger': kind === 'danger',
                    'bg-primary': kind === 'info',
                  }
                )}
              >
                {getMessageIcon()}
              </span>
            </span>
            <span>{message}</span>
          </div>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
