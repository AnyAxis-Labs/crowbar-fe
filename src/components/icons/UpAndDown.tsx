import type { SVGProps } from "react";
const SvgUpAndDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.472 1.2c-.17 0-.33.082-.43.22l-5.73 8.021a.607.607 0 0 0 .494.958H6.8v12.4H10V1.727a.53.53 0 0 0-.528-.528M14.528 22.8c.17 0 .33-.083.43-.222l5.73-8.02a.607.607 0 0 0-.494-.959H17.2V1.2H14v21.072c0 .292.236.528.528.528"
    />
  </svg>
);
export default SvgUpAndDown;
