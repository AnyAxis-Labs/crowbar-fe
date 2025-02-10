import type { SVGProps } from "react";
const SvgWebsite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 33"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 27.824c6.253 0 11.323-5.07 11.323-11.323S22.253 5.178 16 5.178 4.677 10.248 4.677 16.5 9.747 27.824 16 27.824M4.677 16.5h22.646"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 5.178A17.32 17.32 0 0 1 20.529 16.5a17.32 17.32 0 0 1-4.53 11.323A17.32 17.32 0 0 1 11.472 16.5 17.32 17.32 0 0 1 16 5.178"
    />
  </svg>
);
export default SvgWebsite;
