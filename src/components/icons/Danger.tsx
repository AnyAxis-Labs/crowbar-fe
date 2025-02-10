import type { SVGProps } from "react";
const SvgDanger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 21"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.902.915A4.6 4.6 0 0 0 6.98 3.192L.794 14.326a4.324 4.324 0 0 0 3.78 6.424h12.852a4.324 4.324 0 0 0 3.78-6.424L15.02 3.192A4.6 4.6 0 0 0 11.902.915M11 12.25a.75.75 0 0 1-.75-.75v-4a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-.75.75m.75 2.75a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 1.5 0z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDanger;
