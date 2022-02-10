
const carouselStyles = {
    container: {
        display: 'flex',
        color: "#494949",
        justifyContent: 'end',
        flexDirection: 'column',
        width: '100%',
        marginTop: "20px",
        paddingLeft: '15px',
        alignItems: 'center',
    },
    carousel: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '300px',    
        alignSelf: 'flex-end',
        "@media (max-width: 1495px)": {
            alignSelf: 'center',
        }
    },
    Project: {
        position: 'relative',
        overflow: 'hidden',
        padding: '20px'
    },
    CheckButton:
    {
        marginTop: '40px',
        color: 'white',
        fontSize: '18px',
        border: '3px solid white',
        textTransform: 'capitalize'
    }
}
   
export default carouselStyles;