import styled, { css } from "styled-components";

export const StyledLink = styled.a`
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  padding: 0.6rem 1.2rem;
  border-radius: 0.4rem;
  color: black;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.12)
  width:auto;
    ${({ justifySelf }) =>
      justifySelf &&
      css`
        justify-self: ${justifySelf};
      `}
    ${({ variant }) =>
      variant === "outlined" &&
      css`
        text-align: center;
        background-color: white;
        border: 3px solid lightsalmon;
      `};
`;
