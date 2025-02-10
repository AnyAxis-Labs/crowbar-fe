import type { SVGProps } from "react";
const SvgSend = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 25"
    {...props}
  >
    <g fill="#076200" clipPath="url(#send_svg__a)">
      <path d="M8.75 18.32v4.638a.751.751 0 0 0 1.354.444l2.713-3.692zM23.685.848a.75.75 0 0 0-.782-.054l-22.5 11.75a.752.752 0 0 0 .104 1.375l6.255 2.138 13.321-11.39-10.308 12.42 10.483 3.582q.118.04.242.04a.75.75 0 0 0 .742-.639l2.75-18.5a.75.75 0 0 0-.307-.722" />
    </g>
    <defs>
      <clipPath id="send_svg__a">
        <path fill="#fff" d="M0 .709h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSend;
