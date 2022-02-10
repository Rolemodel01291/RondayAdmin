import { button, defaultFont, greenColor, whiteColor } from "../../ronday-material-dashboard";

const style = (theme) => ({
    button: {
        ...button,
        fontSize: "18px",
        margin: "16px 8px 0",
        color: greenColor[1],
        borderColor: greenColor[1],
    },
    containedButton: {
        ...button,
        fontSize: "18px",
        fontWeight: 600,
        margin: "16px 8px 0",
        padding: "12px 48px",
        color: whiteColor,
        border: `1px solid ${greenColor[2]}`,
        backgroundColor: greenColor[2],
    },
    container: {
        ...defaultFont,
        textAlign: "center",
        padding: "0px !important",
    },
    card: {
        padding: "16px",
        margin: "50px auto 348px",
        border: "2px solid rgba(0, 0, 0, 0.08)",
        borderRadius: "6px",
        maxWidth: "calc(100vw - 30px)",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "640px",
            flexDirection: "column",
        },
    },
    notValidCard: {
        ...defaultFont,
        fontWeight: "normal",
        maxWidth: "640px",
        margin: "0 auto 348px",
        borderRadius: "6px",
    },
    cardHeader: {
        ...defaultFont,
        fontWeight: "bold",
        padding: "0 0 8px 0 !important",
        fontSize: "24px",
        [theme.breakpoints.up("md")]: {
            fontSize: "24px",
        },
        lineHeight: "21px",
    },
    inviteText: {
      ...defaultFont,
      marginTop: '40px',
      marginBottom: '40px',
      fontSize: '18px',
    },
    joinCard: {
        ...defaultFont,
        fontWeight: "normal",
        flexDirection: "column",
        marginTop: "214px",
        [theme.breakpoints.up("sm")]: {
            flexDirection: "row",
        },
    },
    joinText: {
        marginBottom: "16px",
        textAlign: "center",
        fontWeight: "bold",
        [theme.breakpoints.up("sm")]: {
            textAlign: "left",
            marginBottom: "0px",
        },
    },
    joinButton: {
        ...button,
        color: greenColor[1],
        borderColor: greenColor[1],
    },
    boldText: {
        fontWeight: "bold",
        fontSize: "18px",
        marginBottom: "16px",
        [theme.breakpoints.up("sm")]: {
            marginBottom: "0px",
        },
    },
    nextText: {
        fontWeight: "bold",
        fontSize: "16px",
        marginBottom: "16px",
        [theme.breakpoints.up("sm")]: {
            marginBottom: "0px",
        },
    },
    acceptText: {
        fontWeight: "normal",
        fontSize: '16px',
    },
    content: {
        ...defaultFont,
        color: '#8A000E',
        backgroundColor: '#F8D7DA',
        minHeight: "auto",
        fontStyle: 'normal',
        fontWeight: "400",
        textDecoration: "none",
        opacity: '0.6',
        fontSize: '16px',
        lineHeight: '19px',
        textAlign: 'center',
        flex: 'none',
        order: '1',
        padding: "24px",
        alignSelf: 'stretch',
        flexGrow: '0',
    },
    fontBold: {
        ...defaultFont,
        fontWeight: "bold",
    },
    inviteButton: {
        ...defaultFont,
        color: '#15886C',
        fontWeight: 'bold'
    }
});

export default style;
