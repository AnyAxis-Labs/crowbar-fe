import type { SVGProps } from "react";
const SvgLink = (props: SVGProps<SVGSVGElement>) => (
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
      fillRule="evenodd"
      d="M15.208 4.875a2.113 2.113 0 0 0-3 0l-1.333 1.333-1.25-1.166 1.417-1.417c1.5-1.5 3.833-1.5 5.333 0l.083.083c1.5 1.5 1.5 3.834 0 5.334l-1.416 1.416-1.167-1.166 1.417-1.417c.833-.833.833-2.083-.084-3M4.958 15.208a2.11 2.11 0 0 0 3 0l1.417-1.416 1.083 1.25-1.416 1.416c-1.5 1.5-3.834 1.5-5.334 0l-.083-.083c-1.5-1.5-1.5-3.833 0-5.333l1.417-1.417 1.166 1.167-1.416 1.416c-.834.834-.834 2.084.166 3M7.042 5.709l7.25 7.333-1.167 1.167-7.25-7.333z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgLink;
