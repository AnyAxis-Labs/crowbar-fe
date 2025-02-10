import type { SVGProps } from "react";
const SvgChat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 25"
    {...props}
  >
    <path
      fill="currentColor"
      d="M18 1.709H6a5.006 5.006 0 0 0-5 5v8a5.01 5.01 0 0 0 4 4.9v3.1a1 1 0 0 0 1.555.832l5.745-3.832H18a5.006 5.006 0 0 0 5-5v-8a5.006 5.006 0 0 0-5-5m-2 12H8a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2m2-4H6a1 1 0 1 1 0-2h12a1 1 0 1 1 0 2"
    />
  </svg>
);
export default SvgChat;
