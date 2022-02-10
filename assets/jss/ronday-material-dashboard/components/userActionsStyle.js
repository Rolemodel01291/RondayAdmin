import { button, defaultFont, greenColor } from "../../ronday-material-dashboard";

const styles = {
  button: {
    ...button,
    color: "rgba(0, 0, 0, 0.8)",
    padding: "6px 4px 6px 12px",
    lineHeight: "1",
    fontSize: "16px",
    fontWeight: "normal",
    "& > span": {
      marginRight: "2px",
    },
    "&:hover": {
      backgroundColor: "rgba(21, 136, 108, 0.08)"
    }
  },
  paper: {
    ...defaultFont,
    border: "2px solid rgba(0, 0, 0, 0.08)",
    minWidth: "140px" 
  },
  menuItem: {
    ...defaultFont,
    fontWeight: "normal"
  }
};

export default styles;
