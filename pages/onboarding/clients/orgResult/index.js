import React, {useEffect, useState} from 'react';
import Router, {useRouter} from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import OfficeOrganization from '../../../../components/OfficeOrganization/OfficeOrganization';
import MenuItem from "../../../../components/MenuItem/MenuItem"
import {getOrganizations, setPathForInvite} from "../../../../components/store/authSlice";
import {getSpaceTypes} from "../../../dashboard/spaces/store/spaceSlice";

import styles from "../../../../assets/jss/ronday-material-dashboard/views/onboardStyle";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";


function OrgResult() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { asPath }= useRouter();
    const selectedOrgName = useSelector((state) => state.client.selectedOrgName);
    const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
    const organizations = useSelector((state) => state.auth.organizations);
    const token = useSelector((state) => state.auth.token);
    const selectedOrgSize = useSelector((state) => state.client.selectedOrgSize);
    const selectedOrgStyle = useSelector((state) => state.client.selectedOrgStyle);
    let spaceTypeId;

    const [state, setState] = useState({
        spaceTypeId: "",
        spaceSize: ""
    })

    const {
        logout
    } = useAuth0();

    useEffect(() => {
        dispatch(getOrganizations(token));
        dispatch(getSpaceTypes(token)).then((res) => {
            if (!res.payload) {
                localStorage.clear();
                logout();
            } else {
                if (selectedOrgStyle.style === "Modern") {
                    if (selectedOrgSize.number === 35) {
                        spaceTypeId = res.payload?.find(x => x.displayName.includes('Small') && x.displayName.includes('Modern'))?.spaceTypeId;
                    } else if (selectedOrgSize.number === 50) {
                        spaceTypeId = res.payload?.find(x => x.displayName.includes('Medium') && x.displayName.includes('Modern'))?.spaceTypeId;
                    } else {
                        spaceTypeId = res.payload?.find(x => x.displayName.includes('Large') && x.displayName.includes('Modern'))?.spaceTypeId;
                    }
                } else if (selectedOrgStyle.style === "Traditional") {
                    if (selectedOrgSize.number === 35) {
                        spaceTypeId = res.payload?.find(x => x.displayName.includes('Small') && x.displayName.includes('Traditional'))?.spaceTypeId;
                    } else if (selectedOrgSize.number === 50) {
                        spaceTypeId = res.payload?.find(x => x.displayName.includes('Medium') && x.displayName.includes('Traditional'))?.spaceTypeId;
                    } else {
                        spaceTypeId = res.payload?.find(x => x.displayName.includes('Large') && x.displayName.includes('Traditional'))?.spaceTypeId;
                    }
                }

                setState({
                    ...state,
                    spaceTypeId,
                    spaceSize: res.payload?.find(x => x.spaceTypeId === spaceTypeId)?.maxCapacity
                });
            }
        })
    }, [dispatch])

    useEffect(() => {
            history.pushState(null, null, location.href);
            window.onpopstate = function () {
                history.go(1);
            };
    }, []);

    function go2Invite() {
        dispatch(setPathForInvite(asPath));
        Router.push("/onboarding/clients/orgInvite");
    }

    return (
        <>
            <div className='flex flex-col flex-auto items-center justify-center h-screen'>
                <div className="flex flex-col items-center justify-center max-w-640 min-w-320 bg-gray-200 rounded-lg min-h-480 max-h-640">
                    <div className="flex mb-8 mt-24 text-center">
                        {selectedOrgSize.org === "org4" ?
                            <Typography variant="h5" component="h5" className={classes.cardTitleBlack}>
                                Your offices are ready for people to join!
                            </Typography> :
                            <Typography variant="h5" component="h5" className={classes.cardTitleBlack}>
                                Your <span className={classes.fontBold}>{selectedOrgName}</span> office is <br></br>ready for people to join!
                            </Typography>
                        }

                    </div>

                    <div className="flex flex-row flex-wrap mx-16 items-center justify-center">
                        <OfficeOrganization
                            item={organizations?.find(x => x.organizationId === selectedOrganizationId)}
                            size={state.spaceSize}
                        />
                    </div>
                    <div className="flex my-8">
                        <Button variant="outlined" color="primary" onClick={go2Invite} className={clsx(classes.button)}>Invite People to Join!</Button>
                    </div>
                    <Divider className="w-3/4" />
                    <div className="flex mt-8">
                        <Typography variant="h5" component="h2" className={classes.next}>
                            What‘s next?
                        </Typography>
                    </div>
                    <div className="flex flex-row flex-wrap mt-2 mb-16 items-center justify-center">
                        <div className="flex m-2">
                            <MenuItem title="Download Ronday to start it!" img="/get_app.svg" menu="menu1" />
                        </div>
                        <div className="flex m-2">
                            <MenuItem title="Go to the Admin Dashboard →" img="/chrome_reader.svg" menu="menu2" spaceTypeId={state.spaceTypeId} displayName={selectedOrgName + ' office'}/>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default withAuthenticationRequired(OrgResult);

