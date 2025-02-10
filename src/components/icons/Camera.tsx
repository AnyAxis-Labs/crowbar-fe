import type { SVGProps } from "react";
const SvgCamera = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 21"
    {...props}
  >
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.633 19.042h8.734c2.3 0 3.216-1.409 3.325-3.125l.433-6.884A3.13 3.13 0 0 0 15 5.708a1.37 1.37 0 0 1-1.208-.741l-.6-1.209c-.384-.758-1.384-1.383-2.234-1.383H9.05c-.858 0-1.858.625-2.242 1.383l-.6 1.209c-.233.45-.7.741-1.208.741a3.13 3.13 0 0 0-3.125 3.325l.433 6.884c.1 1.716 1.025 3.125 3.325 3.125M8.75 7.375h2.5"
    />
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 15.71A2.714 2.714 0 0 0 12.708 13 2.714 2.714 0 0 0 10 10.293a2.714 2.714 0 0 0-2.708 2.708A2.714 2.714 0 0 0 10 15.71"
    />
  </svg>
);
export default SvgCamera;
