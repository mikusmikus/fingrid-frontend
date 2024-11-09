import classNames from 'classnames';
import { animate, motion, useMotionValue } from 'framer-motion';
import React, { useRef } from 'react';
import ReactModal from 'react-modal';
import useResizeObserver from 'use-resize-observer';

import Button from './button/button';
import { SvgClose } from './icons';

type Props = {
  isOpen: boolean;
  size?: 'large' | 'medium';
  noPadding?: boolean;
  onRequestClose?: () => void;
  onAfterClose?: () => void;
  children: React.ReactNode;
  header: React.ReactNode;
  footer?: React.ReactNode;
  footerClassName?: string;
  lessHeaderPadding?: boolean;
  bgGrey?: boolean;
  blueHeaderBg?: boolean;
  withScrollFade?: boolean;
};

export function Modal({
  isOpen,
  size,
  footerClassName,
  noPadding,
  lessHeaderPadding,
  withScrollFade,
  onRequestClose,
  onAfterClose,
  header,
  children,
  footer,
  bgGrey,
  blueHeaderBg,
}: Props) {
  const height = useMotionValue(0);

  const { ref } = useResizeObserver({
    onResize: (rect) => {
      if (rect.height) {
        animate(height, rect.height);
      }
    },
  });

  let width = 'max-w-[407px]';
  if (size === 'large') width = 'max-w-[800px]';
  if (size === 'medium') width = 'max-w-[518px]';

  return (
    <ReactModal
      isOpen={isOpen}
      parentSelector={() => {
        return document.getElementById('next-modals') ?? document.body;
      }}
      onAfterClose={onAfterClose}
      onRequestClose={onRequestClose}
      portalClassName="jernia-ui ReactModalPortal"
      overlayClassName={{
        base: `
            fixed
            z-30
            w-full
            h-full
            top-0
            left-0
            flex
            items-center
            justify-center
            bg-neutral-900/30
            transition-opacity
            duration-300
          `,
        afterOpen: isOpen ? 'opacity-100' : '',
        beforeClose: 'opacity-0',
      }}
      className={{
        base: `
            fixed
            max-h-full
            border
            border-neutral-300
            bg-neutral-000
            ${width}
            w-[calc(100%-1.5rem)]
            transform
            rounded
            outline-none
            transition-transform
            duration-300
          `,
        afterOpen: isOpen ? 'scale-100' : '',
        beforeClose: 'scale-90',
      }}
      closeTimeoutMS={300}
    >
      <motion.div className="overflow-hidden" style={{ height }}>
        <div ref={ref} className="calculated-dvh flex flex-col">
          <ModalHeader
            onClose={onRequestClose}
            bgGrey={bgGrey}
            blueHeaderBg={blueHeaderBg}
            lessHeaderPadding={lessHeaderPadding}
          >
            {header}
          </ModalHeader>
          <ModalBody
            noPadding={noPadding}
            bgGrey={bgGrey}
            withScrollFade={withScrollFade}
            hasFooter={Boolean(footer)}
          >
            {children}
          </ModalBody>
          {footer ? (
            <ModalFooter bgGrey={bgGrey} className={footerClassName}>
              {footer}
            </ModalFooter>
          ) : null}
        </div>
      </motion.div>
    </ReactModal>
  );
}

function ModalHeader({
  children,
  onClose,
  bgGrey,
  blueHeaderBg,
  lessHeaderPadding,
}: {
  children: React.ReactNode;
  onClose?: () => void;
  bgGrey?: boolean;
  blueHeaderBg?: boolean;
  lessHeaderPadding?: boolean;
}) {
  return (
    <div
      className={classNames(
        'flex items-center justify-between border-neutral-500 rounded-t p-4',
        !blueHeaderBg ? 'border-b' : '',
        bgGrey || blueHeaderBg ? 'bg-primary-100 border-neutral-500' : ''
      )}
    >
      <h3 className="text-p-reg-base">{children}</h3>
      {onClose && (
        <Button variant="primary-dark" size="md" onClick={onClose}>
          <SvgClose className="size-6" />
        </Button>
      )}
    </div>
  );
}

function ModalBody({
  children,
  noPadding,
  hasFooter,
  bgGrey,
  withScrollFade,
}: {
  children: React.ReactNode;
  noPadding?: boolean;
  hasFooter: boolean;
  bgGrey?: boolean;
  withScrollFade?: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const content = (
    <div
      ref={contentRef}
      className={classNames(
        'max-h-[80vh]  rounded-b p-4',
        withScrollFade ? '' : 'overflow-y-auto',
        hasFooter ? 'pb-4' : '',
        bgGrey ? 'bg-neutral-300' : ''
      )}
    >
      {children}
    </div>
  );

  return content;
}

function ModalFooter({
  bgGrey,
  children,
  className,
}: {
  children: React.ReactNode;
  bgGrey?: boolean;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        'p-4 pt-4 md:p-8 z-20',
        bgGrey ? 'bg-neutral-300' : 'bg-neutral-100',
        className
      )}
    >
      {children}
    </div>
  );
}
