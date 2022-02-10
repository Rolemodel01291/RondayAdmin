import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import OrgDialog from '../OrgDialog/OrgDialog';
import {spaceTypeStageUrl} from '../../services/awsService/inviteId';

const useStyles = makeStyles({
    root: {
        maxWidth: 250,
        minHeight: 210,
        minWidth: 240,
        borderWidth: 5,
        borderColor: 'transparent',
    },
    orgStyle: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", ' +
            'Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        color: 'gray',
        backgroundColor: '#E5E7EB',
        borderRadius: '30px',
        padding: '0 10px'
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", ' +
            'Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight: '600'
    },
    fontBold: {
        fontWeight: '800'
    }
});

export default function OfficeOrganization(props) {
    const selectedOrgName = useSelector((state) => state.client.selectedOrgName);
    const selectedOrgSize = useSelector((state) => state.client.selectedOrgSize);
    const selectedOrgStyle = useSelector((state) => state.client.selectedOrgStyle);
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClose = (value) => {
        setOpen(value);
    };

    return (
        <>
            <Card className={clsx(classes.root)}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={spaceTypeStageUrl+selectedOrgStyle.img}
                        title={selectedOrgName}
                    />
                    <CardContent>
                        {selectedOrgSize.org === "org4" ?
                            <Typography gutterBottom variant="h6" component="h6" className={classes.typography}>
                                {selectedOrgSize.spaceCount} <span className={classes.fontBold}>{selectedOrgName}</span>  Offices
                            </Typography> :
                            <Typography gutterBottom variant="h6" component="h6" className={classes.typography}>
                                {selectedOrgName} Office
                            </Typography>
                        }

                        <span variant="body2" className={clsx(classes.orgStyle)}>
                            {selectedOrgStyle.style}
                        </span>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.typography}>
                            Up to {props.size} people
                        </Typography>
                    </CardContent>
            </Card>
            <OrgDialog open={open} handleClose={handleClose} />
        </>
    );
}