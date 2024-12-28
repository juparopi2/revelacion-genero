import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 3a5 5 0 0 0-1 9.9V15H8v2h3v4h2v-4h3v-2h-3v-2.1A5.002 5.002 0 0 0 12 3zM9 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"
      clipRule="evenodd"
    />
  </svg>
);
export { SvgComponent as IconGenderFemale };
