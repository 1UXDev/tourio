import styled from "styled-components";
import { Roboto_Condensed, Yuji_Boku } from "@next/font/google";

const RobotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "700",
});

const Yuji = Yuji_Boku({
  subsets: ["latin"],
  weight: "400",
});

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
  font-size: 2.5em;
  font-family: ${Yuji.style.fontFamily};
  color: rgb(66, 135, 245);
`;

export default function TitleBar() {
  return <Headline>Tourio</Headline>;
}
