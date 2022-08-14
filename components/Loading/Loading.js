import styled from "styled-components";
import { spin, theme } from "../../constants";

const LoadingIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid ${theme.colors.lime500};
  border-color: ${theme.colors.blue900} ${theme.colors.lime500}${theme.colors
      .lime500}${theme.colors.lime500};
  animation: ${spin} 0.5s linear infinite;
  margin: 0 auto !important;
`;

export const Loading = () => {
  return <LoadingIcon />;
};
