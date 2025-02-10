import type { SVGProps } from "react";
const SvgX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 21 21"
    {...props}
  >
    <g clipPath="url(#x_svg__a)">
      <path
        fill="currentColor"
        d="M16.243.543h3.052l-6.667 8.489L20.5 20.543h-6.185l-4.819-6.978-5.542 6.978H.902l7.148-9.067L.5.543h6.345l4.378 6.4zm-1.084 17.956h1.686L5.922 2.453H4.074z"
      />
    </g>
    <defs>
      <clipPath id="x_svg__a">
        <path fill="#fff" d="M.5.5h20v20H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgX;
