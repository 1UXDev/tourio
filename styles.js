import { createGlobalStyle } from "styled-components";
import { Roboto_Condensed, Yuji_Boku, Dancing_Script } from "@next/font/google";

const RobotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "700",
});

const Yuji = Yuji_Boku({
  subsets: ["latin"],
  weight: "400",
});
export const DancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
});

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0px auto;
    font-family: system-ui;
    max-width:680px;
    min-width:350px;
    background-color:rgb(245,245,245);
  }

  image{
    object-fit:contain;
  }

  #edit-place, #add-place{
    padding-left:12px;
  }

  button{
    cursor: pointer;
  }

  #map{
    margin-bottom:24px;
  }
  h1,h2,h3{
    font-family: ${DancingScript.style.fontFamily};
    font-size:1.8em;
  }
`;
