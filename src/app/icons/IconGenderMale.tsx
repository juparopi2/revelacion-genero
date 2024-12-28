import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m12.189 7 .002-2 7 .007-.008 7-2-.002.004-3.588-3.044 3.044a5.002 5.002 0 0 1-7.679 6.336 5 5 0 0 1 6.25-7.736l3.058-3.057L12.189 7zm-4.31 5.14a3 3 0 1 1 4.242 4.244A3 3 0 0 1 7.88 12.14z"
      clipRule="evenodd"
    />
  </svg>
);
export { SvgComponent as IconGenderMale };
