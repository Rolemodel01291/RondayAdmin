import { defaultFont, greenColor, whiteColor } from "../../ronday-material-dashboard";

const organizationListStyle = (theme) => {
  return {
    listItem: {
      padding: "16px 0 0 0",
      margin: "16px 0 0 0",
      borderTop: "2px solid rgba(0, 0, 0, 0.06)",
    },
    list: {
      "& > :first-child": {
        borderTop: "none",
      },
      paddingTop: "0 !important",
    },
    card: {
      ...defaultFont,
      fontWeight: "normal",
      maxWidth: "640px",
      margin: "0 auto 48px",
      padding: "24px",
      border: "2px solid rgba(0, 0, 0, 0.08)",
      borderRadius: "6px",
    },
    cardHeader: {
      ...defaultFont,
      fontWeight: "normal",
      padding: "0 0 8px 0 !important",
      fontSize: "18px",
      color: "rgba(0, 0, 0, 0.6)",
      [theme.breakpoints.up("md")]: {
        fontSize: "18px",
      },
      lineHeight: "21px",
    },
    imageCard: {
      width: "48px",
      height: "48px",
      display: "flex",
      padding: "8px",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "16px",
      boxShadow: "none",
    },
    emptyCard: {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
    button: {
      ...defaultFont,
      marginLeft: "auto",
      borderRadius: "32px",
      textTransform: "none",
      height: "fit-content",
      lineHeight: "19px",
      margin: "auto 0",
      color: greenColor[1],
      fontWeight: 500,
      padding: '8px 16px',
      backgroundColor: "rgba(21, 136, 108, 0.08)",
      "&:hover": {
        color: whiteColor,
        backgroundColor: greenColor[0],
      },
    },
    orgName: {
      fontSize: "18px",
      lineHeight: "24px",
      color: "rgba(0, 0, 0, 0.8)",
      [theme.breakpoints.up("sm")]: {
        fontSize: "20px",
      },
    },
    orgInfo: {
      fontWeight: "normal",
      color: "rgba(0, 0, 0, 0.6)",
      fontSize: "14px",
      lineHeight: "17px"
    },
    noOrganizationsListItem: {
      display: "flex",
      padding: "0px !important",
      color: "rgba(0, 0, 0, 0.8)",
      flexDirection: "column",
      alignItems: "flex-start !important",
      marginTop: "32px",
      width: "100%",
      "& > p > a": {
        textDecoration: "underline",
      },
    },
    noOrgText: {
        ...defaultFont,
        fontSize: "18px",
    },
    noOrgTextBold: {
        ...defaultFont,
        fontSize: "18px",
        fontWeight: "bold",
    },
    containerLink: {
      display: "flex",
      padding: "0px",
      width: "100%",
    },
  };
};

export default organizationListStyle;
