import type { SVGProps } from "react";
const SvgReload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g clipPath="url(#reload_svg__a)">
      <path
        fill="#000"
        d="M10.956 19.944c4.012-.45 7.228-3.657 7.685-7.669.6-5.245-3.476-9.71-8.587-9.768V.154c0-.131-.164-.2-.274-.119L4.934 3.594a.15.15 0 0 0 0 .24l4.846 3.56c.11.08.274.007.274-.12V4.927c3.59.057 6.467 3.113 6.222 6.765-.209 3.142-2.77 5.691-5.912 5.891-3.33.213-6.161-2.165-6.668-5.31a1.21 1.21 0 0 0-1.193-1.01c-.73 0-1.303.65-1.188 1.373.71 4.482 4.85 7.844 9.641 7.309"
      />
    </g>
    <defs>
      <clipPath id="reload_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgReload;
