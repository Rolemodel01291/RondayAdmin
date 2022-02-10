import { blackColor, defaultFont, dangerColor } from "../../ronday-material-dashboard";


const errorStyle = (theme) => ({
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
        flex: 'none',
        order: '1',
        padding: "24px",
        flexGrow: '0',
        marginTop: '40px',
        marginBottom: '40px',
    },
    matchContent: {
      ...defaultFont,
      marginBottom: '36px',
      fontSize: '18px',
    },
    button: {
        ...defaultFont,
        color: '#15886C',
    },
    card: {
        ...defaultFont,
        fontWeight: "normal",
        maxWidth: "640px",
        margin: "0 auto 348px",
        padding: "24px",
        border: "2px solid rgba(0, 0, 0, 0.08)",
        borderRadius: "6px",
    },
    cardHeader: {
        ...defaultFont,
        fontWeight: "bold",
        padding: "0 0 8px 0 !important",
        fontSize: "24px",
        color: "rgba(0, 0, 0, 0.6)",
        [theme.breakpoints.up("md")]: {
            fontSize: "18px",
        },
        lineHeight: "21px",
    },
})

export default errorStyle;