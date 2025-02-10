import type { SVGProps } from "react";
const SvgWallet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 25"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.78 6.26a.48.48 0 0 0-.48.48v.84q0 .063.015.12H18.26c.53 0 .96.43.96.96v3.36h-3.36a1.92 1.92 0 0 0 0 3.84h3.36v3.12c0 .531-.43.96-.96.96H5.3a.96.96 0 0 1-.96-.96V6.74c0-.795.645-1.44 1.44-1.44h9.12a.48.48 0 1 1 0 .96zm10.8 8.4a.72.72 0 1 0 0-1.44.72.72 0 0 0 0 1.44"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgWallet;
