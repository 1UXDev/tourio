import styled from "styled-components";
import { DancingScript } from "../styles";

const Headline = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.08);
  margin: 0;
  padding-bottom: 8px;
  text-align: center;
  z-index: 1;
  font-size: 3.2em;
  font-family: ${DancingScript.style.fontFamily};
  color: rgb(66, 135, 245);
`;

export default function TitleBar() {
  return <Headline>Tourio</Headline>;
}
