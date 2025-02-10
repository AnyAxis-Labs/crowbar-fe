import type { SVGProps } from "react";
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 60 61"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M17.5 30.196c2.354 1.712 7.06 6.419 8.987 9.628C28.84 34.69 34.83 23.135 41.25 18"
    />
  </svg>
);
export default SvgCheck;
