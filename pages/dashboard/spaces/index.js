import React, { useEffect, useState } from "react";
import Router from "next/router";
import Button from '@material-ui/core/Button';
import AddedSpace from '../../../components/AddedSpace/AddedSpace';
import AddSpace from '../../../components/AddSpace/AddSpace';
import Admin from "../../../layouts/Admin";

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setIsEdit, getSpaces } from "./store/spaceSlice";
import MySnackbar from "../../../components/MySnackbar/MySnackbar";
import RondayLoading from "../../../components/RondayLoading/RondayLoading";

import styles from "../../../assets/jss/ronday-material-dashboard/views/onboardStyle";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";


function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
  const token = useSelector((state) => state.auth.token);
  const addedSpaces = useSelector((state) => state.space.addedSpaces);

  const [state, setState] = useState({
    open: false,
    loading: true,
  })

    const {
        logout
    } = useAuth0();

  useEffect(() => {
    if (selectedOrganizationId) {
        dispatch(getSpaces({selectedOrganizationId, token})).then((res) => {
            if (!res.payload) {
                localStorage.clear();
                logout();
            } else {
                if (addedSpaces.length >= 25) {
                    setState({...state, loading: false, open: true});
                } else {
                    setState({...state, loading: false});
                }
            }

        })
    } else {
        Router.push("/onboarding");   
    }
  }, [dispatch, selectedOrganizationId])





  const handle = () => {
      dispatch(setIsEdit({isEdit: false, id: null}));
      Router.push('/dashboard/spaces/type');
  }

  function handleClose(isOpen) {
    setState({ ...state, open: isOpen });
  }

  if (state.loading) {
    return <RondayLoading />;
  }


  return (
    <Admin>
      <div className={classes.headerbar}>
        <div className={classes.space}>
          Total Spaces: {addedSpaces.length > 0 ? addedSpaces.length: ""}
        </div>
        <div className={classes.action}>
            <Button
                variant="contained"
                className={classes.typography}
                onClick={handle}
                disabled={addedSpaces.length > 25 ? true : false}
            >
              Add new space
            </Button>
        </div>
      </div>
      <div className={classes.content}>
        { addedSpaces.length > 0 &&
            _.orderBy(addedSpaces, [addedSpace => addedSpace.displayName.toLowerCase()],['asc'])?.map((addedSpace, index) => (
          <div className={classes.card} key={index}>
            <AddedSpace item={addedSpace}/>
          </div>
        ))}
        <div className={classes.card}>
          <AddSpace />
        </div>
      </div>
      <MySnackbar open={state.open} handleClose={handleClose} title={`You can’t create more than 25 spaces. \n
       Delete one of your existing spaces to create a new one`} />

    </Admin>

  );
}

//Dashboard.layout = Admin;

export default withAuthenticationRequired(Dashboard);

