import type { SVGProps } from "react";
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="m16.067 11.692-5.625 5.625a.627.627 0 0 1-.884 0l-5.625-5.625a.625.625 0 1 1 .884-.884l4.558 4.558V3.125a.625.625 0 0 1 1.25 0v12.241l4.558-4.558a.625.625 0 0 1 .884.884"
    />
  </svg>
);
export default SvgArrow;
