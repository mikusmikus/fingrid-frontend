import React, { useContext } from 'react';

export type IconSize =
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 'auto';

type Props = {
  size: IconSize;
  children: React.ReactNode;
};

const IconSizeContext = React.createContext<IconSize>(4);

export function IconSizeProvider({ size, children }: Props) {
  return (
    <IconSizeContext.Provider value={size}>{children}</IconSizeContext.Provider>
  );
}

const sizeToClassMap: Record<IconSize, string> = {
  1.5: 'w-1.5 h-1.5',
  2: 'w-2 h-2',
  2.5: 'w-2.5 h-2.5',
  3: 'w-3 h-3',
  3.5: 'w-3.5 h-3.5',
  4: 'w-4 h-4',
  5: 'w-5 h-5',
  6: 'w-6 h-6',
  8: 'w-8 h-8',
  10: 'w-10 h-10',
  12: 'w-12 h-12',
  auto: '',
};

export function useIconSizeClassName(
  sizeFromProp: IconSize | undefined
): string {
  const sizeFromContext = useContext(IconSizeContext);

  const size = sizeFromProp ?? sizeFromContext;

  return sizeToClassMap[size];
}
