'use client';

import clsx from 'clsx';
import { ReactNode, useId, useState } from 'react';

import { SvgCaretDown } from './icons';
import { Typography } from './typography/typography';

type AccordionProps = {
  title: string;
  children: ReactNode;
  variant?: 'dark' | 'gray' | 'light';
  size?: 'sm' | 'lg';
  className?: string;
};

export const Accordion = ({
  title,
  children,
  variant = 'gray',
  size = 'sm',
  className = '',
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const panelId = useId();
  const buttonId = useId();

  return (
    <div
      className={clsx(
        'flex flex-col rounded-3 duration-300',
        {
          'bg-secondary-600 text-neutral-000': variant === 'dark' && !isOpen,
        },
        {
          'bg-neutral-100 text-neutral-900': variant === 'gray' && !isOpen,
        },
        {
          'bg-secondary-500 text-neutral-000': variant === 'dark' && isOpen,
        },
        {
          'bg-neutral-300 text-neutral-900': variant === 'gray' && isOpen,
        },
        className
      )}
    >
      <button
        id={buttonId}
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex w-full items-center justify-between rounded-2 px-4 py-3',
          {
            'focus-visible:focus-style-dark': variant === 'gray',
            'focus-visible:focus-style-light':
              variant === 'dark' || variant === 'light',
          }
        )}
      >
        <Typography variant={size === 'sm' ? 'p-bld-base' : 'p-bld-md'}>
          {title}
        </Typography>
        <SvgCaretDown
          aria-hidden
          className={clsx('shrink-0 duration-300', {
            'rotate-180': isOpen,
            'h-4 w-4': size === 'sm',
            'h-6 w-6': size === 'lg',
          })}
        />
      </button>
      <div
        role="region"
        id={panelId}
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={clsx(
          'grid overflow-hidden transition-all duration-300 ease-in-out',
          {
            'grid-rows-1fr visible': isOpen,
            'grid-rows-0fr invisible': !isOpen,
          }
        )}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
