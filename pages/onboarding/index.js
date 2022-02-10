import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Router from "next/router";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Organization from '../../components/Organization/Organization';
import MySnackbar from '../../components/MySnackbar/MySnackbar';
import {getUser, setAuthentication, setHeader} from "../../components/store/authSlice";
import { setOrganizationType } from './clients/store/clientSlice';
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';


import styles from "../../assets/jss/ronday-material-dashboard/views/onboardStyle";

function Onboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
  const selectedOrgType = useSelector((state) => state.client.selectedOrgType);
  const token = useSelector((state) => state.auth.token);

  const {
    logout
  } = useAuth0();

  const [state, setState] = useState({
    org: "",
    focus: null,
    open: false,
  })


  useEffect(()=>{
    setState({...state, org: selectedOrgType.org, focus: selectedOrgType.focus})
  }, [selectedOrgType])

  useEffect(() => {
    if (token) {
      dispatch(getUser({token})).then((res)=>{
        if (!res.payload) {
          localStorage.clear();
          logout();
        }
      })
    }
  }, [dispatch])

  function handleOrg(organization) {
    organization === 'org1' ?
        dispatch(setOrganizationType({org: organization, focus: 1})) :
        dispatch(setOrganizationType({org: organization, focus: 2}))
  }

  function goNext() {
    state.org === "org1" ?
      Router.push(
        '/onboarding/family/orgStyle'
      ) : state.org === "org2" ?
        Router.push(
          '/onboarding/clients/orgSize'
        ) : setState({ ...state, open: true });
  }

  function handleClose(isOpen) {
    setState({ ...state, open: isOpen });
  }


  return (
          <>
            <div className='flex items-center justify-center h-fullSize'>
              {/*{isAuthenticated &&*/}
              {/*<button onClick={logout}>Log out</button>*/}
              {/*}*/}
              <div
                  className="flex flex-col items-center justify-center max-w-400 min-w-256 bg-gray-200 rounded-lg min-h-256 max-h-480">
                <div className="flex mt-36">
                  <Typography variant="h5" component="h5" className={classes.cardTitle}>
                    Creating an organization on Ronday
                  </Typography>
                </div>
                <div className="flex mb-24">
                  <Typography variant="h4" component="h4" className={classes.cardTitleBlack}>
                    Step 1
                  </Typography>
                </div>
                <div className="flex mt-8">
                  <Typography variant="h5" className={classes.fontBold}>
                    Who do you want to use Ronday with?
                  </Typography>
                </div>
                <div className="flex flex-row flex-wrap m-8 items-center justify-center">
                  <div className="flex m-2">
                    <Organization title="Friends & Family" img="forest.png" org="org1" focus={state.focus}
                                  handleFocus={handleOrg}/>
                  </div>
                  <div className="flex m-2">
                    <Organization title="Co-workers & Clients" img="large_modern_office.png" org="org2"
                                  focus={state.focus} handleFocus={handleOrg}/>
                  </div>
                </div>
                <div className="flex m-16 self-end">
                  <Button variant="outlined" color="primary" onClick={goNext} className={classes.nextTypography}>Next</Button>
                </div>
                <MySnackbar open={state.open} handleClose={handleClose} title="Choose an answer to proceed."/>
              </div>
            </div>
          </>
  );

}

export default withAuthenticationRequired(Onboard);

