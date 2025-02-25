import type { SVGProps } from "react";
const SvgArrowUpRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#EC5409"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m4.667 11.333 6.666-6.667M4.667 4.666h6.666v6.667"
    />
  </svg>
);
export default SvgArrowUpRight;
