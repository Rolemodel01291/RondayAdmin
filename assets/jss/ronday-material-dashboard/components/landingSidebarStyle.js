import { button, greenColor, whiteColor } from "../../ronday-material-dashboard";

const styles = {
    
  drawerLogo: {
    fontWeight: 400,
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.6)",
    lineHeight: 1.5,
    "@media (min-width:1280px)": {
      fontSize: "18px",
    },
    padding: "24px 0",
    marginLeft: "0",
    display: "block",
    borderBottom: "none",
  },
  drawerLinksContainer: {
    padding: "86px 24px",
    width: "295px",
    "& > :last-child": {
      borderBottom: "none",
    },
  },
  li: {
    padding: "0 0 24px 0",
    marginTop: "24px",
    marginLeft: "0",
    display: "block",
    borderBottom: `1px solid rgba(0, 0, 0, 0.08)`,
    color: "rgba(0, 0, 0, 0.6)",
    "& > a": {
      display: "block",
      cursor: "pointer"
    },
  },
  joinWaitlistBtn: {
    ...button
  },
}

export default styles;