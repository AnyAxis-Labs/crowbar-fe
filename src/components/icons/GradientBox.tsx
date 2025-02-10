import type { SVGProps } from "react";
const SvgGradientBox = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 80 81"
    {...props}
  >
    <g filter="url(#gradient-box_svg__a)">
      <rect
        width={80}
        height={80}
        y={0.5}
        fill="url(#gradient-box_svg__b)"
        fillOpacity={0.2}
        rx={25}
      />
      <rect
        width={80}
        height={80}
        y={0.5}
        fill="#282C26"
        fillOpacity={0.5}
        rx={25}
      />
      <rect
        width={78.75}
        height={78.75}
        x={0.625}
        y={1.125}
        stroke="url(#gradient-box_svg__c)"
        strokeWidth={1.25}
        rx={24.375}
      />
      <rect
        width={78.75}
        height={78.75}
        x={0.625}
        y={1.125}
        stroke="url(#gradient-box_svg__d)"
        strokeWidth={1.25}
        rx={24.375}
      />
      <rect
        width={78.75}
        height={78.75}
        x={0.625}
        y={1.125}
        stroke="#ECFFCC"
        strokeOpacity={0.16}
        strokeWidth={1.25}
        rx={24.375}
      />
    </g>
    <defs>
      <radialGradient
        id="gradient-box_svg__c"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(64.495 34.87 39.86)scale(26.9768 33.9468)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D7FF94" />
        <stop offset={1} stopColor="#D7FF94" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="gradient-box_svg__d"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(-90 57.476 34.619)scale(46.6667)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D7FF94" />
        <stop offset={1} stopColor="#D7FF94" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="gradient-box_svg__b"
        x1={40}
        x2={40}
        y1={0.5}
        y2={80.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.342} stopColor="#C2FE5E" stopOpacity={0} />
        <stop offset={1} stopColor="#C2FE5E" />
      </linearGradient>
      <filter
        id="gradient-box_svg__a"
        width={130}
        height={130}
        x={-25}
        y={-24.5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={12.5} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_22_5490"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_22_5490"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgGradientBox;
