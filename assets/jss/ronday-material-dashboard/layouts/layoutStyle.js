import {
    drawerWidth,
    transition,
    container,
  } from "../../ronday-material-dashboard";
  
  const appStyle = (theme) => ({
    wrapper: {
      position: "relative",
      top: "0",
      height: "100vh",
      backgroundColor: "#F3F1E9",
    },
    mainPanel: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
      overflow: "auto",
      position: "relative",
      float: "right",
      ...transition,
      maxHeight: "100%",
      width: "100%",
      overflowScrolling: "touch",
      fontFamily: 'Inter',
    },
    content: {
      fontFamily: 'Inter',
      backgroundColor: "#F3F1E9",
    },
    container:{
        ...container,
        padding:"108px 0 0" ,
        [theme.breakpoints.up("md")]:{
          padding:"101px 0 0"
        }
    },
    map: {
      marginTop: "70px",
    },
  });
  
  export default appStyle;
  