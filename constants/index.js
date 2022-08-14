import { keyframes } from "styled-components";
export const theme = {
  colors: {
    lime600: "#009DAE",
    lime500: "#8FE3CF",
    lime400: "#71DFE7",
    lime200: "#C2FFF9",
    yellow: "#FFE652",
    blue900: "#002B5B",
    white: "#fff",
    black: "#000",
  },
};

const screenSize = {
  xs: 481,
  sm: 641,
  md: 769,
  lg: 1025,
  xl: 1281,
  xxl: 1537,
};

export const media = {
  xs: `@media only screen and (min-width: ${screenSize.xs}px)`,
  sm: `@media only screen and (min-width: ${screenSize.md}px)`,
  md: `@media only screen and (min-width: ${screenSize.md}px)`,
  lg: `@media only screen and (min-width: ${screenSize.lg}px)`,
  xl: `@media only screen and (min-width: ${screenSize.xl}px)`,
  xxl: `@media only screen and (min-width: ${screenSize.xxl}px)`,
};

export const appear = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const spin = keyframes`
from {
  transform: rotate(0);
}
to {
  transform: rotate(360deg);
}
`;
