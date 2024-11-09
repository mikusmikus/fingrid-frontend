import {
  SvgCheckedBox,
  SvgClose,
  SvgInfoCircle,
  SvgInfoTriangle,
} from '@riis/ui';
import clsx from 'clsx';

type AlertType = 'success' | 'info' | 'warning' | 'error';

const icons = {
  success: <SvgCheckedBox className=" size-4 shrink-0" aria-hidden />,
  info: <SvgInfoCircle className=" size-4 shrink-0" aria-hidden />,
  warning: <SvgInfoTriangle className=" size-4 shrink-0" aria-hidden />,
  error: <SvgInfoTriangle className=" size-4 shrink-0" aria-hidden />,
};

export type AlertProps = {
  type?: AlertType;
  message: string;
  title?: string;
  isInline?: boolean;
  className?: string;
  onClose: () => void;
};
export const Alert = ({
  type = 'info',
  message,
  title,
  isInline = false,
  className,
  onClose,
}: AlertProps) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={clsx(
        'flex w-full items-center gap-x-3',
        {
          'rounded border p-3': !isInline,
          'text-success-text': type === 'success',
          'text-info-text': type === 'info',
          'text-warning-text': type === 'warning',
          'text-error-text': type === 'error',

          'border-success-icon bg-success-bg ': type === 'success' && !isInline,
          'border-info-icon bg-info-bg ': type === 'info' && !isInline,
          'border-warning-icon bg-warning-bg ': type === 'warning' && !isInline,
          'border-error-icon bg-error-bg ': type === 'error' && !isInline,
        },
        className
      )}
    >
      {icons[type] || null}
      <div className="grow">
        {title && <p className={clsx('mb-2 text-cap-sm')}>{title}</p>}

        <p className="text-p-reg-xs">{message}</p>
      </div>
      <button
        type="button"
        aria-label="Lukk varsel"
        title="Lukk varsel"
        onClick={onClose}
      >
        <SvgClose className="size-4 shrink-0" aria-hidden />
      </button>
    </div>
  );
};
