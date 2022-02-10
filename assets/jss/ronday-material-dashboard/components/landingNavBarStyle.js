import { blackColor, button } from "../../ronday-material-dashboard";

const styles = (theme) => ({
  li: {
    padding: "0 16px",
  },
  navBar: {
    backgroundColor: "#F3F1E9", 
    color: "rgba(0, 0, 0, 0.8)",
    padding: "24px 16px 0",
  },
  container: {
    maxWidth: "1200px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "auto",
    paddingBottom: "20px",
    borderBottom: "4px solid rgba(0, 0, 0, 0.06)",
  },
  list: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  joinWaitlistBtn: {
    ...button,
    fontSize: "16px",
    fontWeight: "normal",
    lineHeight: 1,
  },
  mobileActions: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  iconLightest: {
    fill: "rgba(0, 0, 0, 0.6)",
    fontSize: "32px",
  },
});

export default styles;
