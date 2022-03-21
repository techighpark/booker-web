import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const darkMode = {
  middleTextFontColor: "#757575",
  primary: {
    bgColor: "#202124",
    fontColor: "#EBECEC",
    accent: {
      bgColor: "",
      fontColor: "#FF9000",
    },
  },
  secondary: {
    bgColor: "",
    fontColor: "#616161",
  },
  box: {
    bgColor: "#202124",
    borderColor: "#757b7f",
  },
  button: {
    bgColor: "#303134",
    fontColor: "",
    hoverBgColor: "#424242",
    activeBorderColor: "#757b7f",
    activeBgColor: "#757b7f",
    accent: {
      bgColor: "black",
      fontColor: "white",
    },
  },
  input: {
    bgColor: "#202124",
    fontColor: "#9B9DA0",
    borderColor: "#757b7f",
    placeholderColor: "#616161",
    errorBorderColor: "",
  },
  link: {
    bgColor: "",
    fontColor: "#C5C5C6",
    hoverFontColor: "#616161",
    accent: {
      bgColor: "",
      fontColor: "#FF9000",
      hoverFontColor: "#FF9300",
    },
  },
};
export const lightMode = {
  middleTextFontColor: "#9E9E9E",
  primary: {
    bgColor: "#EEEEEE",
    fontColor: "#202124",
    accent: {
      bgColor: "",
      fontColor: "#FF9000",
    },
  },
  secondary: {
    bgColor: "",
    fontColor: "#616161",
  },
  box: {
    bgColor: "#EEEEEE",
    borderColor: "#757b7f",
  },
  button: {
    bgColor: "#E0E0E0",
    fontColor: "",
    hoverBgColor: "#BDBDBD",
    activeBorderColor: "#757b7f",
    accent: {
      bgColor: "#5e35b1",
      fontColor: "#b39ddb",
    },
  },
  input: {
    bgColor: "#EEEEEE",
    fontColor: "#424242",
    borderColor: "#757b7f",
    placeholderColor: "#616161",
    errorBorderColor: "",
  },
  link: {
    bgColor: "",
    fontColor: "#202124",
    hoverFontColor: "#616161",
    accent: {
      bgColor: "",
      fontColor: "#FF9000",
      hoverFontColor: "#FF9300",
    },
  },
};
export const fontType = {
  basic: `'Titillium Web', sans-serif`,
  balboo: `"Baloo 2",cursive`,
  roboto: `'Roboto', sans-serif`,
  lexend: `'Lexend Deca', sans-serif`,
};

export const GlobalStyle = createGlobalStyle`
${reset}
a{
    text-decoration:none ;
    color:${props => props.theme.link.fontColor};
    &:hover{
      color:${props => props.theme.link.hoverFontColor}
    }
}
input {
    all:unset;
}
* {
    box-sizing:border-box;
}
body{
    background-color:${props => props.theme.primary.bgColor} ;
    color:${props => props.theme.primary.fontColor};
    font-size:14px;
    font-weight:300 ;
    font-family: ${fontType.roboto};
    width:100% ;
}`;
