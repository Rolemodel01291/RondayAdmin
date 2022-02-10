import {
  drawerWidth,
  transition,
  container, defaultFont,
} from "../../ronday-material-dashboard";
  
  const appStyle = (theme) => ({
    wrapper: {
      position: "relative",
      top: "0",
      height: "100vh",
      backgroundColor: "#F3F1E9"
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
      ...defaultFont
    },
    content: {
      marginTop: "30px",
      padding: "30px",
      minHeight: "calc(100vh - 85px)",
      ...defaultFont
    },
    container,
    map: {
      marginTop: "70px",
    },
  });
  
  export default appStyle;
  