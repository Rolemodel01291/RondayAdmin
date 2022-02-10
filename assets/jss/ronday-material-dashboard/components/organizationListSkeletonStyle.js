const styles = (theme) => ({
  card: {
    maxWidth: "640px",
    margin: "20px auto 48px",
    padding: "24px",
    border: "2px solid rgba(0, 0, 0, 0.08)",
    borderRadius: "6px",
  },
  skeletonCardHeader: {
    height: "35px",
    paddingBottom: "8px",
    width: "100%",
    marginBottom: "32px",
  },
  skeletonOrganizationImage: {
    width: "50px",
    height: "50px",
    marginRight: "16px",
    borderRadius: "6px",
    [theme.breakpoints.up("md")]: {
      width: "60px",
      height: "60px",
    },
  },
  skeletonList: {
    padding: "8px 0px",
    '& > *': {
        display: "flex",
        padding: "16px 0 0 0",
        margin: "16px 0 0 0",
        borderTop: "2px solid #F0F0F0",
    },
    '& > :first-child': {
        paddingTop: "0",
        marginTop: "0",
        borderTop: "none",
    },
  },
  orgInfoSkeleton: { width: "calc(100% - 76px)" }
});

export default styles;
