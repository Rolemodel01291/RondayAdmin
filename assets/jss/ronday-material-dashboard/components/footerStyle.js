import {
    defaultFont,
    container,
    primaryColor,
    grayColor,
  } from "../../ronday-material-dashboard";
  
  const footerStyle = {
    block: {
      color: "rgba(0,0,0,0.6)",
      padding: "10px",
      //textTransform: "uppercase",
      borderRadius: "3px",
      textDecoration: "none",
      position: "relative",
      display: "block",
      ...defaultFont,
      fontWeight: "400",
      fontSize: "14px",
      cursor: 'pointer',
    },
    download: {
      color: "rgba(0,0,0,0.6)",
      padding: "10px",
      //textTransform: "uppercase",
      borderRadius: "3px",
      textDecoration: "none",
      position: "relative",
      display: "block",
      ...defaultFont,
      fontWeight: "400",
      fontSize: "14px",
      cursor: 'pointer',
    },
    copyright: {
      color: "rgba(0,0,0,0.4)",
      padding: "10px",
      //textTransform: "uppercase",
      borderRadius: "3px",
      textDecoration: "none",
      position: "relative",
      display: "block",
      ...defaultFont,
      fontWeight: "400",
      fontSize: "14px",
    },
    left: {
      float: "left!important",
      display: "block",
    },
    right: {
      padding: "10px 0",
      margin: "0",
      fontSize: "12px",
      float: "right!important",
    },
    footer: {
      bottom: "0",
      borderTop: "1px solid " + grayColor[11],
      padding: "12px 0",
      ...defaultFont,
    },
    container,
    a: {
      color: primaryColor,
      textDecoration: "none",
      backgroundColor: "transparent",
    },
    list: {
      marginBottom: "0",
      padding: "0",
      marginTop: "0",
    },
    inlineBlock: {
      display: "inline-block",
      padding: "0 20px",
      width: "auto",
    },
  };
  export default footerStyle;
  