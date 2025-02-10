import type { SVGProps } from "react";
const SvgArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 17"
    {...props}
  >
    <path
      fill="currentColor"
      d="M3.229 7.635a.37.37 0 0 0 .266.112h1.953c.153 0 .276.123.276.276v6.107c0 .204.166.37.37.37h3.801a.37.37 0 0 0 .37-.37V8.023c0-.153.123-.276.276-.276h1.958a.37.37 0 0 0 .265-.635L8.262 2.61a.37.37 0 0 0-.26-.11.37.37 0 0 0-.264.11L3.236 7.112a.37.37 0 0 0-.007.523"
    />
  </svg>
);
export default SvgArrowUp;
