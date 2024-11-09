import clsx from 'clsx';
import { ElementType } from 'react';

type HeaderVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type DisplayVariant = 'd1' | 'd2';

type BodyVariantRegular =
  | 'p-reg-lg'
  | 'p-reg-md'
  | 'p-reg-base'
  | 'p-reg-sm'
  | 'p-reg-xs'
  | 'p-reg-link-lg'
  | 'p-reg-link-md'
  | 'p-reg-link-base'
  | 'p-reg-link-sm'
  | 'p-reg-link-xs';

type BodyVariantBold =
  | 'p-bld-lg'
  | 'p-bld-md'
  | 'p-bld-base'
  | 'p-bld-sm'
  | 'p-bld-xs'
  | 'p-bld-link-lg'
  | 'p-bld-link-md'
  | 'p-bld-link-base'
  | 'p-bld-link-sm'
  | 'p-bld-link-xs';

type CaptionVariant =
  | 'cap-md'
  | 'cap-base'
  | 'cap-sm'
  | 'cap-xs'
  | 'cap-xxs'
  | 'cap-link-md'
  | 'cap-link-base'
  | 'cap-link-sm'
  | 'cap-link-xs'
  | 'cap-link-xxs';

type BodyVariant = BodyVariantRegular | BodyVariantBold;

export type TypographyVariant =
  | BodyVariant
  | CaptionVariant
  | DisplayVariant
  | HeaderVariant;

type TypographyProps = {
  as?: ElementType;
  children: React.ReactNode;
  variant?: TypographyVariant;
  className?: string;
};

export const Typography = ({
  as: Component = 'p',
  children,
  variant = 'p-reg-base',
  className = '',
  ...props
}: TypographyProps) => (
  <Component
    lang="no"
    className={clsx(
      {
        // Displays
        'text-d1-m md:text-d1-t lg:text-d1 font-barlowSemiCondensed uppercase':
          variant === 'd1',
        'text-d2-m md:text-d2-t lg:text-d2 font-barlowSemiCondensed uppercase':
          variant === 'd2',

        // Headings
        'text-h1-m lg:text-h1 font-barlow': variant === 'h1',
        'text-h2-m lg:text-h2 font-barlow': variant === 'h2',
        'text-h3-m lg:text-h3 font-barlow': variant === 'h3',
        'text-h4-m lg:text-h4 font-barlow': variant === 'h4',
        'text-h5-m lg:text-h5 font-barlow': variant === 'h5',
        'text-h6-m lg:text-h6 font-barlow': variant === 'h6',

        // Bodies - regular - links
        'text-p-reg-lg-m lg:text-p-reg-lg':
          variant === 'p-reg-lg' || variant === 'p-reg-link-lg',
        'text-p-reg-md': variant === 'p-reg-md' || variant === 'p-reg-link-md',
        'text-p-reg-base':
          variant === 'p-reg-base' || variant === 'p-reg-link-base',
        'text-p-reg-sm': variant === 'p-reg-sm' || variant === 'p-reg-link-sm',
        'text-p-reg-xs': variant === 'p-reg-xs' || variant === 'p-reg-link-xs',

        // Bodies - bold - links
        'text-p-bld-lg-m lg:text-p-bld-lg':
          variant === 'p-bld-lg' || variant === 'p-bld-link-lg',
        'text-p-bld-md': variant === 'p-bld-md' || variant === 'p-bld-link-md',
        'text-p-bld-base':
          variant === 'p-bld-base' || variant === 'p-bld-link-base',
        'text-p-bld-sm': variant === 'p-bld-sm' || variant === 'p-bld-link-sm',
        'text-p-bld-xs': variant === 'p-bld-xs' || variant === 'p-bld-link-xs',

        // Bodies - links
        underline: variant.includes('link'),

        // Captions
        'text-cap-md': variant === 'cap-md' || variant === 'cap-link-md',
        'text-cap-base': variant === 'cap-base' || variant === 'cap-link-base',
        'text-cap-sm': variant === 'cap-sm' || variant === 'cap-link-sm',
        'text-cap-xs': variant === 'cap-xs' || variant === 'cap-link-xs',
        'text-cap-xxs': variant === 'cap-xxs' || variant === 'cap-link-xxs',
      },
      className
    )}
    {...props}
  >
    {children}
  </Component>
);
