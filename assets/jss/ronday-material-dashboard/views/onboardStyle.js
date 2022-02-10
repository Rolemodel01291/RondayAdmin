import {
  successColor,
  whiteColor,
  blackColor,
  grayColor,
  infoColor,
  hexToRgb,
  defaultFont,
} from "../../ronday-material-dashboard";

const dashboardStyle = {
  successText: {
    color: successColor[0],
  },
  infoText: {
    ...defaultFont,
    color: 'blue',
    cursor: 'pointer'
  },
  copyLink: {
    ...defaultFont,
    backgroundColor: '#2196f3',
    color: 'white',
    padding: '5px'
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
  cardTitleBlack: {
    color: blackColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "500",
    ...defaultFont,
    marginBottom: "3px",
    textDecoration: "none",
  },
  fontBold: {
    ...defaultFont,
    fontWeight: 700
  },
  title: {
    ...defaultFont,
    fontSize: '36px'
  },
  button: {
    ...defaultFont,
    fontWeight: '500',
    margin: '5px',
  },
  headerbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    "@media (max-width: 1120px)": {
      justifyContent: 'center'
    }
  },
  card: {
    padding: '30px 2px',
    flex: '0 0 33.3333%',
    "@media (max-width: 1495px)": {
      flex: '0 0 50%',
    },
    ...defaultFont,
  },
  typography: {
    ...defaultFont,
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#25AE8D'
  },
  emailTypography: {
    ...defaultFont,
    fontWeight: '500',
  },
  nextTypography: {
    ...defaultFont,
    fontWeight: '500',
  },
  next: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    textAlign: 'center',
    color: 'black',
    fontWeight: '500'
  }
  
};

export default dashboardStyle;







