import type { SVGProps } from "react";
const SvgMessage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 21"
    {...props}
  >
    <g clipPath="url(#message_svg__a)">
      <path
        fill="#BDFE1C"
        d="M10 .709c-5.514 0-10 4.486-10 10v9.375c0 .345.28.625.625.625H10c5.514 0 10-4.486 10-10s-4.486-10-10-10m.625 12.5h-5a.625.625 0 0 1 0-1.25h5a.625.625 0 0 1 0 1.25m3.75-3.75h-8.75a.625.625 0 0 1 0-1.25h8.75a.625.625 0 0 1 0 1.25"
      />
    </g>
    <defs>
      <clipPath id="message_svg__a">
        <path fill="#fff" d="M0 .709h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMessage;
