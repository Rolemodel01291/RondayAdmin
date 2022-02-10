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
      ...defaultFont,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
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
        color: '#15886C',
        display: 'flex',
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    inviteArea: {
        display: 'flex',
        marginLeft: '20px',
        alignItems: 'center',
    },
    action: {
      display: 'flex',
      textAlign: "end",
      alignItems: 'center',
    },
    content: {
      minWidth: '700px',
      display: 'flex',
      flexWrap: 'wrap',
    },
    card: {
      padding: '30px 2px',
      flex: '0 0 33.3333%'
    },
    linkCopied:  {
      ...defaultFont,
      backgroundColor: '#2196f3',
      color: 'white',
      padding: '5px'
    },
    typography: {
      ...defaultFont
    }
  };
  
  export default dashboardStyle;
  