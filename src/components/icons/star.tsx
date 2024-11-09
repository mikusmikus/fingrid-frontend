import type { SVGProps } from 'react';
export const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.4863 4.11413C11.1607 2.95186 12.8392 2.95187 13.5136 4.11413L15.5789 7.67349C15.7693 8.00158 16.0984 8.22547 16.4734 8.28212L19.9031 8.80012C21.3981 9.02592 21.9225 10.9135 20.7582 11.8781L18.2593 13.9484C17.9085 14.239 17.7436 14.6974 17.8288 15.1448L18.5288 18.8208C18.803 20.2607 17.2914 21.3795 15.9944 20.6966L12.5823 18.9C12.2178 18.7081 11.7821 18.7081 11.4176 18.9L8.00554 20.6966C6.70853 21.3795 5.1969 20.2607 5.4711 18.8208L6.17108 15.1448C6.25628 14.6974 6.09136 14.239 5.74062 13.9484L3.24172 11.8781C2.07744 10.9135 2.60184 9.02592 4.09683 8.80012L7.52648 8.28212C7.90154 8.22547 8.23059 8.00158 8.42097 7.67349L10.4863 4.11413ZM12.2162 4.86696C12.1198 4.70092 11.8801 4.70092 11.7837 4.86696L9.71837 8.42632C9.29954 9.14811 8.57563 9.64067 7.7505 9.76529L4.32085 10.2833C4.10728 10.3156 4.03236 10.5852 4.19869 10.723L6.69759 12.7933C7.46922 13.4326 7.83205 14.441 7.6446 15.4254L6.94462 19.1014C6.90545 19.3071 7.1214 19.4669 7.30669 19.3693L10.7187 17.5727C11.5207 17.1505 12.4792 17.1505 13.2812 17.5727L16.6932 19.3693C16.8785 19.4669 17.0945 19.3071 17.0553 19.1014L16.3553 15.4254C16.1679 14.441 16.5307 13.4326 17.3023 12.7933L19.8012 10.723C19.9675 10.5852 19.8926 10.3156 19.6791 10.2833L16.2494 9.76529C15.4243 9.64067 14.7004 9.14811 14.2815 8.42632L12.2162 4.86696Z"
      fill="currentColor"
    />
  </svg>
);