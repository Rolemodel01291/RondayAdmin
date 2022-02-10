import { blackColor, defaultFont } from "../../ronday-material-dashboard";

const footerStyle = (theme) => ({
  title: {
    fontWeight: 500,
    fontSize: "20px",
    color: blackColor,
    lineHeight: 1.5,
    [theme.breakpoints.up("md")]: {
      fontSize: "28px",
    },
    borderRadius: "8px",
    marginBottom: "24px",
  },
  logo: {
    margin: "auto",
  },
  heart: {
    margin: "0 auto 24px",
    width: "48px",
    height: "48px",
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto 40px",
    },
  },
  copyright: {
    textAlign: "center",
    fontWeight: 400,
    marginTop: "12px",
    fontSize: "14px",
    color: "rgba(0, 0, 0, 0.6)",
    lineHeight: 1.5,
  },
  copyrightContainer: {
    margin: "0 15px",
    padding: "18px 0 0 0",
    borderTop: `2px solid rgba(0, 0, 0, 0.04)`,
  },
  footer: {
    ...defaultFont,
    position: "relative",
    width: "calc(100vw - 32px)",
    maxWidth: "1200px",
    paddingBottom: "24px",
    margin: "0 auto",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "calc(100vw - 48)",
    },
    [theme.breakpoints.up("xl")]: {
      width: "calc(100vw - 120px)",
      maxWidth: "1200px",
    },
  },
  mainFooterSection: {
    borderRadius: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    padding: "20px",
  },
  linkContainer: {
    padding: "0 0 16px 0",
  },
  a: {
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      "& > :first-child": {
        paddingTop: "0",
      },
      "& > :last-child": {
        paddingBottom: "0",
        borderBottom: "none",
      },
    },
  },
  listItem: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
    margin: "4px 20px",
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.6)",
  },
  joinRondayContainer: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      marginBottom: "80px",
    },
  },
});

export default footerStyle;
