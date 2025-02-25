import type { SVGProps } from "react";
const SvgMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 14"
    {...props}
  >
    <path
      stroke="#EC5409"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1 1.5h16M1 7h16M1 12.5h16"
    />
  </svg>
);
export default SvgMenu;
