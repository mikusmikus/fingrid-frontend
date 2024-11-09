import type { SVGProps } from 'react';
export const SvgApple = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.711 1.37734C16.7015 1.15855 16.5968 0.954848 16.4245 0.819718C16.2521 0.684589 16.0293 0.631533 15.8146 0.674482C15.3143 0.77454 13.6826 1.1796 12.3944 2.46782C11.7366 3.12562 11.3724 3.956 11.1752 4.71195C11.0735 5.10154 11.0128 5.48411 10.9805 5.8344C10.9036 5.80097 10.8229 5.76602 10.7374 5.72955C10.0444 5.43409 9.14804 5.08909 8.12793 5.08909C7.03526 5.08909 5.48479 5.53363 4.20475 6.78991C2.90699 8.06357 1.9502 10.1078 1.9502 13.1904C1.95019 14.9223 2.81631 17.4409 3.98365 19.4848C4.57388 20.5182 5.26871 21.4801 6.01869 22.1888C6.74709 22.8771 7.63552 23.4271 8.60318 23.4022C9.3234 23.3992 10.0524 23.1165 10.6205 22.8961L10.6706 22.8767C11.3242 22.6235 11.7902 22.4525 12.1812 22.4525C12.5552 22.4525 13.0248 22.6232 13.6894 22.8777L13.7379 22.8963C14.3146 23.1174 15.0573 23.4022 15.7705 23.4022C16.3091 23.4022 16.9326 23.1141 17.4784 22.7746C18.0618 22.4118 18.6929 21.9032 19.2742 21.2993C20.4118 20.1174 21.4909 18.428 21.449 16.6201C21.4425 16.3369 21.2769 16.0816 21.0211 15.96C20.6741 15.7952 20.1081 15.4228 19.6309 14.8756C19.158 14.3333 18.8094 13.6641 18.7876 12.888C18.7569 11.7925 19.0643 10.8237 19.4706 10.0815C19.8917 9.31199 20.3698 8.87106 20.5921 8.75452C20.7841 8.6539 20.9232 8.47515 20.9735 8.26431C21.0238 8.05347 20.9805 7.83118 20.8546 7.65471C20.5119 7.17425 19.8625 6.54287 19.0966 6.03364C18.3388 5.52985 17.3526 5.06894 16.342 5.08924C16.1655 5.09278 15.9924 5.10578 15.8232 5.12636C16.1931 4.57657 16.4079 3.8945 16.5338 3.29577C16.6854 2.57455 16.7318 1.8559 16.711 1.37734ZM13.455 3.52848C13.9966 2.98691 14.6323 2.64484 15.1588 2.43408C15.1359 2.6127 15.1053 2.7994 15.0658 2.98714C14.9351 3.60892 14.7296 4.12902 14.4761 4.42482C13.9971 4.98361 13.3527 5.59354 12.4885 5.83471C12.516 5.59791 12.5601 5.34532 12.6266 5.09069C12.7818 4.49584 13.0458 3.9377 13.455 3.52848ZM16.3721 6.58894C16.9373 6.57758 17.6144 6.84946 18.2661 7.28276C18.6098 7.51129 18.9144 7.76326 19.1567 7.99492C18.799 8.35343 18.4487 8.82425 18.1547 9.36133C17.6418 10.2986 17.2489 11.5283 17.2882 12.9301C17.3224 14.1519 17.8726 15.1416 18.5004 15.8615C18.9599 16.3884 19.4807 16.7946 19.9298 17.0701C19.8037 18.1661 19.1065 19.3105 18.1935 20.2591C17.6915 20.7807 17.156 21.2087 16.6862 21.5009C16.1787 21.8166 15.8622 21.9022 15.7705 21.9022C15.3698 21.9022 14.8824 21.7284 14.2259 21.477L14.1464 21.4464C13.582 21.2297 12.8604 20.9525 12.1812 20.9525C11.4819 20.9525 10.763 21.2317 10.2008 21.45L10.1287 21.478C9.48102 21.7289 9.00224 21.9022 8.59191 21.9022C8.5843 21.9022 8.57669 21.9023 8.56909 21.9025C8.19306 21.914 7.6751 21.6903 7.04891 21.0986C6.44142 20.5245 5.83184 19.6962 5.28618 18.7409C4.18176 16.8072 3.45019 14.5539 3.4502 13.1904C3.4502 10.4342 4.29531 8.80275 5.25542 7.86046C6.23326 6.90078 7.39665 6.58909 8.12793 6.58909C8.82367 6.58909 9.48087 6.82446 10.1491 7.10936C10.2365 7.14663 10.3271 7.18609 10.4191 7.22616C10.6564 7.32947 10.9028 7.4368 11.1268 7.52074C11.4388 7.63772 11.8062 7.74983 12.1812 7.74983C12.5562 7.74983 12.9274 7.64471 13.2506 7.53068C13.4925 7.44536 13.7559 7.33644 14.0107 7.23108C14.0961 7.19577 14.1805 7.16085 14.2628 7.12737C14.9564 6.84525 15.645 6.60354 16.3721 6.58894Z"
      fill="currentColor"
    />
  </svg>
);
