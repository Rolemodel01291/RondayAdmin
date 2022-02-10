import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Organization from '../../../../components/Organization/Organization';
import { setOrganizationStyle } from '../store/clientSlice';
import MySnackbar from '../../../../components/MySnackbar/MySnackbar';

import styles from "../../../../assets/jss/ronday-material-dashboard/views/onboardStyle";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {getUser} from "../../../../components/store/authSlice";


function OrgStyle() {
	const useStyles = makeStyles(styles);
	const classes = useStyles();
	const dispatch = useDispatch();
	const selectedOrgStyle = useSelector((state) => state.client.selectedOrgStyle);
	const token = useSelector((state) => state.auth.token);
	const [state, setState] = useState({
		org: '',
		focus: null,
		open: false,
	})


	const {
		logout
	} = useAuth0();

	useEffect(() => {
		setState({ ...state, org: selectedOrgStyle.org, focus: selectedOrgStyle.focus });
	}, [selectedOrgStyle])

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
			setState({ ...state, org: organization, focus: 1 }) :
			setState({ ...state, org: organization, focus: 2 })
	}

	function goNext() {
		state.org === 'org1' ?
			dispatch(setOrganizationStyle({ style: 'Traditional', img: 'large_office.png', org: state.org, focus: state.focus }))
			:
			dispatch(setOrganizationStyle({ style: 'Modern', img: 'large_modern_office.png', org: state.org, focus: state.focus }))

		if (!state.org) {
			setState({ ...state, open: true });
		} else {
			Router.push("/onboarding/clients/orgName");
		}
	}

	function goPrev() {
		Router.push('/onboarding/clients/orgSize');
	}

	function handleClose(isOpen) {
		setState({ ...state, open: isOpen });
	}


	return (
		<div className='flex flex-col flex-auto flex-shrink-0 items-center justify-center h-screen '>
			<div className="flex flex-col items-center justify-center max-w-400 min-w-256 bg-gray-200 rounded-lg min-h-480 max-h-640">
				<div className="flex mt-36">
					<Typography
						variant="h5"
						component="h5"
						className={classes.cardTitle}
					>
						Creating an organization on Ronday
					</Typography>
				</div>
				<div className="flex mb-24">
					<Typography
						variant="h4"
						component="h4"
						className={classes.cardTitleBlack}
					>
						Step 3
					</Typography>
				</div>
				<div className="flex mt-8 text-center">
					<Typography
						variant="h5"
						component="h5"
						className={classes.fontBold}
					>
						Choose your primary space style
						<br></br>
						(You can change it later.)
					</Typography>
				</div>
				<div className="flex flex-row flex-wrap m-16 items-center justify-center">
					<div className="flex m-2">
						<Organization
							title="Traditional Office"
							img="large_office.png"
							org="org1"
							focus={state.focus}
							handleFocus={handleOrg}
						/>
					</div>
					<div className="flex m-2">
						<Organization
							title="Modern Office"
							img="large_modern_office.png"
							org="org2"
							focus={state.focus}
							handleFocus={handleOrg}
						/>
					</div>
				</div>
				<div className="flex m-16 mb-24 self-end">
					<Button
						variant="outlined"
						color="primary"
						onClick={goPrev}
						className={clsx(classes.button)}
					>
						Back
					</Button>
					<Button
						variant="outlined"
						color="primary"
						onClick={goNext}
						className={clsx(classes.button)}
					>
						Next
					</Button>
				</div>
			</div>
			<MySnackbar
				open={state.open}
				handleClose={handleClose}
				title="Choose an answer to proceed."
			/>
		</div>
	);
}

export default withAuthenticationRequired(OrgStyle);

