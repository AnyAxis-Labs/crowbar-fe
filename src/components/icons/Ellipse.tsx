import type { SVGProps } from "react";
const SvgEllipse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 386 201"
    {...props}
  >
    <g filter="url(#ellipse_svg__a)">
      <ellipse
        cx={193}
        cy={173.501}
        fill="#ABFF1E"
        fillOpacity={0.2}
        rx={193}
        ry={72.854}
      />
    </g>
    <defs>
      <filter
        id="ellipse_svg__a"
        width={586}
        height={345.709}
        x={-100}
        y={0.646}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_2002_2172"
          stdDeviation={50}
        />
      </filter>
    </defs>
  </svg>
);
export default SvgEllipse;
