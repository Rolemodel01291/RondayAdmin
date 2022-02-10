import {
  blackColor,
  defaultFont,
  successColor,
} from "../../ronday-material-dashboard";

const errorStyle = {
  successText: {
    color: successColor[0],
  },
  background: {
    width: "100%",
    display: "flex",
    position: "relative",
    height: "100%",
  },
  contentField: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "36px",
    width: "100%",
    maxWidth: "640px",
    padding: "12px",
    justifyContent: "center",
    borderBottom: `2px solid rgba(0, 0, 0, 0.06)`,
  },
  icon: {
    marginTop: "32px !important",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.7)",
    minWidth: "412px",
    maxWidth: "420px",
    minHeight: "225px",
  },
  cardTitleBlack: {
    ...defaultFont,
    color: blackColor,
    margin: "24px 0",
    minHeight: "auto",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "23px",
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.7)",
    margin: "12px 0",
  },
};

export default errorStyle;
