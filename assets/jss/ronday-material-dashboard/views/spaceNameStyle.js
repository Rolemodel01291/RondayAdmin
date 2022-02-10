import {
    successColor,
    whiteColor,
    grayColor,
    hexToRgb,
    defaultFont,
    blackColor,
} from "../../ronday-material-dashboard";

const spaceTypeStyle = {
    successText: {
        color: successColor[0],
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
        ...defaultFont,
        color: grayColor[2],
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        marginBottom: "10px",
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
        fontWeight: "700",
        ...defaultFont,
        marginBottom: "20px",
        textDecoration: "none",
    },
    fontBold: {
        fontWeight: 700
    },
    title: {
        ...defaultFont,
        fontSize: '36px'
    },
    container: {
        padding: '50px 150px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
        
    },
    headerbar: {
        // width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10px 30px'
      },
    content: {
        maxWidth: '600px',
        minWidth: '256px',
        minHeight: '256px',
        maxHeight: '700px',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        padding: '30px',
        borderRadius: '5px',
        backgroundColor: '#E5E7EB',
    },
    spaceTitle: {
        display: 'flex',
        
    },
    space: {
        diplay: 'flex',
    },
    back: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: "30px"
    },
    card: {
        padding: '10px 5px',
        flex: '0 0 33.3333%'
    },
    btnMargin: {
        ...defaultFont,
        margin: '10px',
        color: 'white',
        backgroundColor: '#25AE8D'
    }
};

export default spaceTypeStyle;