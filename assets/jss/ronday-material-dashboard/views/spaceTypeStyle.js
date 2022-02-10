import {
    successColor,
    whiteColor,
    grayColor,
    hexToRgb,
    defaultFont,
    blackColor,
} from "../../ronday-material-dashboard";
  
  const spaceTypeStyle = {
    successText: {
      color: successColor[0],
    },
    upArrowCardCategory: {
      width: "16px",
      height: "16px",
    },
    cardCategory: {
      ...defaultFont,
      color: grayColor[0],
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      paddingTop: "10px",
      marginBottom: "0",
    },
    cardCategoryWhite: {
        ...defaultFont,
      color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    cardTitle: {
        ...defaultFont,
      color: grayColor[2],
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: grayColor[1],
        fontWeight: "400",
        lineHeight: "1",
      },
    },
    cardTitleWhite: {
        ...defaultFont,
      color: whiteColor,
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: grayColor[1],
        fontWeight: "400",
        lineHeight: "1",
      },
    },
  cardTitleBlack: {
      color: blackColor,
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "600",
      ...defaultFont,
      marginBottom: "3px",
      textDecoration: "none",
  },
    fontBold:{
      fontWeight:700
    },
    title: {
        ...defaultFont,
      fontSize: '36px'
    },
    container: {
      padding: '50px 150px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    professional: {
      display: 'flex',
      marginTop: '30px',
      padding: 'auto',
      margin: 'auto',
      justifyContent: 'center',
      flexDirection: 'column',
    },

    content: {
      minWidth: '400px',
      display: 'flex',
      flexWrap: 'wrap',
      "@media (max-width: 1063px)": {
        justifyContent: 'center'
      },
     
    },
    divider: {
      margin: '22px 0 0 0',
    },
    header: {
        ...defaultFont,
        color: grayColor[2],
        display: 'flex',
        justifyContent: 'start',
        padding: '20px 5px',
    },
    social: {
        ...defaultFont,
        display: 'flex',
        marginTop: '30px',
        padding: 'auto',
        margin: 'auto',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    socialContent: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '10px 0px',
        minWidth: '400px',
        "@media (max-width: 1063px)": {
          justifyContent: 'center'
        },
    },
    socialHeader: {
        ...defaultFont,
        color: grayColor[2],
        display: 'flex',
        flexDirection: 'row',
        padding: '20px 5px'
    },
    back: {
        backgroundColor: 'white',
        boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: "30px",
        paddingRight: '50px',
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
    },

    hide: {
        display: 'none'
    },

    card: {
      padding: '10px 5px',
      flex: '0 0 33.3333%',
      "@media (max-width: 1495px)": {
        flex: '0 0 50%',
      },
      cursor: 'pointer',
    },
    btnMargin: {
        ...defaultFont,
        margin: '10px',
        color: 'white',
        backgroundColor: '#25AE8D'
    }
  };
  
  export default spaceTypeStyle;