import classNames from 'classnames';
import * as Toast from 'react-hot-toast';

export const toast = Toast.toast;

export const Toaster = ({
  duration = 3000,
  className,
}: {
  duration?: number;
  className?: string;
}) => {
  const defaultClassName = classNames(
    className,
    '!justify-start w-full !max-w-[1276px] !shadow-xl !rounded-md font-semibold text-sm'
  );

  return (
    <Toast.Toaster
      toastOptions={{
        duration,
        className: defaultClassName,
        success: {
          className: classNames(
            defaultClassName,
            '!text-success !bg-secondary-200'
          ),
          iconTheme: {
            primary: 'var(--color-success)',
            secondary: 'var(--color-white)',
          },
        },
      }}
    />
  );
};
