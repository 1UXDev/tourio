import { createGlobalStyle } from "styled-components";

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
`;
