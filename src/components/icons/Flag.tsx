import type { SVGProps } from "react";
const SvgFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 17 17"
    {...props}
  >
    <path
      fill="currentColor"
      d="m4.549 16.487.295-.083a.533.533 0 0 0 .37-.656L1.844 3.696a.666.666 0 0 0-.82-.462l-.038.01a.666.666 0 0 0-.462.82l3.368 12.053c.079.283.373.449.656.37M16.409 8.064a12.8 12.8 0 0 1-2.935-2.019.26.26 0 0 1-.075-.268c.436-1.647.76-3.323.968-5.015.033-.281-.118-.364-.278-.17-3.14 3.754-8.571-.688-11.804 2.725q.058.11.09.229l2.186 7.823C7.799 8 13.21 12.412 16.345 8.666c.16-.193.19-.546.064-.602"
    />
  </svg>
);
export default SvgFlag;
