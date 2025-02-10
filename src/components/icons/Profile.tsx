import type { SVGProps } from "react";
const SvgProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g fill="currentColor" clipPath="url(#profile_svg__a)">
      <path d="M10 10.625a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5m0-6.25a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5" />
      <path d="M10 19.375a9.37 9.37 0 0 1-7.244-3.431l-.325-.4.325-.394a9.375 9.375 0 0 1 14.488 0l.325.394-.325.4A9.38 9.38 0 0 1 10 19.375M4.069 15.55a8.125 8.125 0 0 0 11.875 0 8.125 8.125 0 0 0-11.875 0" />
      <path d="M10 19.375A9.375 9.375 0 1 1 9.987.625 9.375 9.375 0 0 1 10 19.375m0-17.5a8.125 8.125 0 1 0 0 16.25 8.125 8.125 0 0 0 0-16.25" />
      <path d="M3.237 15.55s6.294 7.03 12.7.7l.825-.7S11.412 10 5.981 13.33zM10 10a3.125 3.125 0 1 0 0-6.25A3.125 3.125 0 0 0 10 10" />
    </g>
    <defs>
      <clipPath id="profile_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgProfile;
