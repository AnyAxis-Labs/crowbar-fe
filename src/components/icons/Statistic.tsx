import type { SVGProps } from "react";
const SvgStatistic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M2.558 9.352h5.295v11.647H2.558zM9.352 6.18h5.296V21H9.352zM16.148 3h5.294v18h-5.294z"
    />
  </svg>
);
export default SvgStatistic;
