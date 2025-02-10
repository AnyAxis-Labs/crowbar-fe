import type { SVGProps } from "react";
const SvgTrending = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 17 17"
    {...props}
  >
    <g clipPath="url(#trending_svg__a)">
      <path
        fill="currentColor"
        d="M12.916 5.622a.47.47 0 0 0-.744.122 5.4 5.4 0 0 1-.88 1.24 6.2 6.2 0 0 0-.154-2.381A6.34 6.34 0 0 0 7.91.553a.47.47 0 0 0-.682.379 5.38 5.38 0 0 1-2.243 3.96l-.052.038-.1.071-.014.01A6.4 6.4 0 0 0 2.866 7.27a6.27 6.27 0 0 0-.497 4.471A6.33 6.33 0 0 0 8.5 16.5a6.344 6.344 0 0 0 6.337-6.337 6.29 6.29 0 0 0-1.921-4.54"
      />
    </g>
    <defs>
      <clipPath id="trending_svg__a">
        <path fill="#fff" d="M.5.5h16v16H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTrending;
