import classNames from 'classnames';

type Props = {
  progress: number;
  compact?: boolean;
  reverse?: boolean;
};

export function Progressbar({ progress, compact, reverse }: Props) {
  return (
    <div
      role="progressbar"
      className={classNames('block rounded', {
        'bg-neutral-500': !(reverse && progress > 75),
        'bg-warning-icon': reverse && progress > 75 && progress < 100,
        'bg-primary-600': reverse && progress >= 100,
      })}
    >
      <div
        className={classNames('rounded bg-success-icon transition-all', {
          'h-1': compact,
          'h-2': !compact,
          'ml-auto': reverse,
        })}
        style={{ width: `${reverse ? 100 - progress : progress}%` }}
      />
    </div>
  );
}
