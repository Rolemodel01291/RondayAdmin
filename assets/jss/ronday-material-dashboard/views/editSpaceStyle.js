import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
  defaultFont,
} from "../../ronday-material-dashboard";

const editSpaceStyle = {
  successText: {
    color: successColor[0],
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px",
  },
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
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
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    ...defaultFont,
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    ...defaultFont,
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  fontBold: {
    ...defaultFont,
    fontWeight: 700
  },
  title: {
    ...defaultFont,
    fontSize: '36px'
  },
  headerbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    ...defaultFont,
    display: 'flex',
    fontSize: '32px',
    alignItems: 'center',
    fontWeight: 'bold',
    padding: '30px 0',
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
  spaceInfo: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '20px',
    paddingBottom: '20px',
    minHeight: "585px",
    "@media (max-width: 1495px)": {
      flexDirection: 'column',
    }
  },
  spaceField: {
    display: 'flex',
    flex: '0 0 50%',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: '40px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  spaceBar: {
    display: 'flex',
    flex: '0 0 50%',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '10px',
    "@media (max-width: 1495px)": {
      minHeight: '500px'
    },
    
  },
  
  bar: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: '25px',
  },
  formControl: {
    width: '100%',
  },
  label: {
    width: '10%', 
    minWidth: '70px'
  },
  conferenceRoom: {
    display: 'flex',
    flexWrap: 'wrap',
    "@media (max-width: 723px)": {
      justifyContent: 'center'
    }
  },
  card: {
    padding: '30px 2px',
    flex: '0 0 33.3333%',
    "@media (max-width: 1495px)": {
      flex: '0 0 50%',
    },
  },
  btnMargin: {
    ...defaultFont,
    margin: '10px',
  },
  btnSaveMargin: {
    ...defaultFont,
    margin: '10px',
    color: 'white',
    backgroundColor: '#25AE8D'
  }
};

export default editSpaceStyle;
