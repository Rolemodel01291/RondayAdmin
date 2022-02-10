import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import OrgFamilyDialog from '../OrgFamilyDialog/OrgFamilyDialog';
import {spaceTypeStageUrl} from '../../services/awsService/inviteId'

const useStyles = makeStyles({
    root: {
        maxWidth: 250,
        minHeight: 210,
        minWidth: 240,
        borderWidth: 5,
        borderColor: 'transparent',
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ' +
            'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    }
});

export default function FamilyOfficeOrganization(props) {
    const selectedOrgStyle = useSelector((state) => state.family.selectedOrgStyle);
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
                        image={spaceTypeStageUrl + selectedOrgStyle.img}
                        title={selectedOrgStyle.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h3" className={classes.typography}>
                            {selectedOrgStyle.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.typography}>
                            Up to {selectedOrgStyle.size} People 
                        </Typography>
                    </CardContent>
            </Card>
            <OrgFamilyDialog open={open} handleClose={handleClose} />
        </>
    );
}