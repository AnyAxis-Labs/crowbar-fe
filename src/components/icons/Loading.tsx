import type { SVGProps } from "react";
const SvgLoading = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 120 121"
    {...props}
  >
    <path
      fill="#fff"
      fillOpacity={0.05}
      d="M120 60.5c0 33.137-26.863 60-60 60S0 93.637 0 60.5 26.863.5 60 .5s60 26.863 60 60m-110.4 0c0 27.835 22.565 50.4 50.4 50.4s50.4-22.565 50.4-50.4S87.835 10.1 60 10.1 9.6 32.665 9.6 60.5"
    />
    <path
      fill="#EC5409"
      d="M115.2 60.5c2.651 0 4.82-2.153 4.608-4.795A60 60 0 0 0 105.681 21.6c-1.718-2.019-4.774-2.007-6.649-.132s-1.854 4.9-.166 6.944a50.4 50.4 0 0 1 11.306 27.295c.252 2.64 2.377 4.793 5.028 4.793"
    />
  </svg>
);
export default SvgLoading;
