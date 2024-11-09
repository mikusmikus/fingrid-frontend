import clsx from 'clsx';
import { ElementType, forwardRef } from 'react';

import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '@/types/polymorphic-ref';

export type ContainerVariant = 'narrow' | 'wide';

export type ContainerProps<C extends ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      variant?: ContainerVariant;
    }
  >;

export const Container = forwardRef(function Container<
  C extends ElementType = 'div',
>(
  { as, children, className, variant = 'wide', ...props }: ContainerProps<C>,
  ref: PolymorphicRef<C>
) {
  const Component = as || 'div';

  const isNarrow = variant === 'narrow';
  return (
    <Component
      ref={ref}
      className={clsx('mx-auto w-full px-4 md:px-8 lg:px-16', className, {
        'w-full max-228 md:max-w-236 lg:max-w-252': isNarrow,
        'max-w-360': !isNarrow,
      })}
      {...props}
    >
      {children}
    </Component>
  );
});
