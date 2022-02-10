import {
    successColor,
    defaultFont,
  } from "../../ronday-material-dashboard";
  
  const dashboardStyle = {
    successText: {
      color: successColor[0],
    },
    selectArea: {
      marginLeft: '20px',
      alignItems: 'center',
    },
    formControl: {
      minWidth: '140px',
      width: '100%',
    },
    title: {
      ...defaultFont,
      fontSize: '36px'
    },
    headerbar: {
      width: '70%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      ...defaultFont
    },
    space: {
      ...defaultFont,
      display: 'flex',
      fontSize: '32px',
      alignItems: 'center',
      fontWeight: 'bold',
      padding: '30px 0',
    },
    link: {
         ...defaultFont,
        color: 'blue',
        display: 'flex',
        cursor: 'pointer',
    },
    inviteArea: {
        display: 'flex',
        marginLeft: '20px',
        alignItems: 'center',
    },
    action: {
      ...defaultFont,
      display: 'flex',
      textAlign: "end",
      alignItems: 'center',
    },
    content: {
      minWidth: '400px',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    contentTop: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '70%',
    },

    contentTopName: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '-webkit-fill-available'
    },
    contentTextfield: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    contentActionField: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      width: '70%',
    },
    contentButtonGroup: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contentMiddle: {
      width: '70%',
      display: 'flex',
      flexDirection: 'column',
    },
    divider: {
      margin: "10px 0"
    },
    logoField: {
      display: 'flex',
    //   flexDirection: 'row',
      flexWrap: 'wrap',
    },
    contentBottom: {
      display: 'flex',
      flexDirection: 'row',
    },  
    card: {
      padding: '30px 0px',
      flex: '0 0 33.3333%',
      "@media (max-width: 1495px)": {
        flex: '0 0 50%',
      },
    },
    logoMargin: {
      ...defaultFont,
      margin: '20px 0'
    },
    fontBlue: {
      color: '#15886C'
    },
    btnMargin: {
      ...defaultFont,
      margin: '10px'
    },
    btnSaveMargin: {
      ...defaultFont,
      margin: '10px',
      color: 'white',
      backgroundColor: '#25AE8D'
    },
    typography: {
      ...defaultFont,
    }
  };
  
  export default dashboardStyle;
  