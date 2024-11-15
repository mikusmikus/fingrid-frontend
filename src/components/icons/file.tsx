import type { SVGProps } from 'react';
export const SvgFile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.25 5C4.25 3.48122 5.48122 2.25 7 2.25H14.9868C15.5506 2.25 16.0798 2.52157 16.4085 2.97955L19.4217 7.17745C19.6352 7.47488 19.75 7.83178 19.75 8.1979V19C19.75 20.5188 18.5188 21.75 17 21.75H7C5.48122 21.75 4.25 20.5188 4.25 19V5ZM7 3.75C6.30964 3.75 5.75 4.30964 5.75 5V19C5.75 19.6904 6.30964 20.25 7 20.25H17C17.6904 20.25 18.25 19.6904 18.25 19V8.89705H15C14.5858 8.89705 14.25 8.56126 14.25 8.14705V3.75H7Z"
      fill="currentColor"
    />
  </svg>
);
