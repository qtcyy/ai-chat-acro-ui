import { JSX } from "react";
import styled, { css, keyframes } from "styled-components";

type Props = {
  top?: number | string;
  height?: number | string;
  width?: number | string;
  color?: string;
};

const SelectedLine = ({ top, height, width, color }: Props): JSX.Element => {
  const emptyContent = "";

  return (
    <LineBody $top={top} $height={height} $width={width} $color={color}>
      {emptyContent}
    </LineBody>
  );
};

const LineShow = keyframes`
  0% {
    opacity: 0;
    transform: scaleX(0);
  }

  100%{
    opacity: 1;
    transform: scaleX(1);
  }
`;

const LineBody = styled.div<{
  $top?: number | string;
  $height?: number | string;
  $width?: number | string;
  $color?: string;
}>`
  display: block;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: 17px;
  position: absolute;
  top: ${({ $top }) => $top};
  ${({ $color }) => {
    if ($color) {
      return css`
        color: ${$color};
      `;
    }
  }}
  background-color: ${({ theme }) => theme.colors.text};
  animation: ${LineShow} 0.2s ease-in-out forwards;
`;

export { SelectedLine };
