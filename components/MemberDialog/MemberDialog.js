import React, { useState } from 'react';
import Router from 'next/router'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import MySnackbar from '../MySnackbar/MySnackbar';
import {
	DeactivateMember,
	updateMemberRole,
	cancelInvite,
	ReactivateMember
} from '../../pages/dashboard/members/store/memberSlice';
import {makeStyles} from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles({
	root: {

	},
	title: {
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ' +
			'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	},
	typography: {
		color: '#15886c',
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ' +
			'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	},
	buttonTypography: {
		color: 'white',
		backgroundColor: '#25AE8D',
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ' +
			'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	}
});

function MemberDialog(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const members = useSelector((state) => state.member.members);
	const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
	const token = useSelector((state) => state.auth.token);

	const [state, setState] = useState({
		title: "",
		openSnack: false,
	});



	function handleDialogClose() {
		props.handleClose(false);
	}

	function handleSaveChange() {
		if (props.save === "Deactivate Member") {
			dispatch(DeactivateMember({selectedOrganizationId, orgUserId: props.parent.id, token, isActive: false, isAdmin: props.parent.isAdmin})).then(() => {
				setState({ ...state, title: 'DeActivated successfully', openSnack: true });
				Router.reload('/dashboard/members');
			})
		} else if (props.save === "Reactivate Member") {
			dispatch(ReactivateMember({selectedOrganizationId, orgUserId: props.parent.id, token, isActive: true, isAdmin: props.parent.isAdmin})).then(() => {
				setState({ ...state, title: 'Activated successfully', openSnack: true });
				Router.reload('/dashboard/members');
			})
		} else if (props.save === "Make Admin") {
			dispatch(updateMemberRole({selectedOrganizationId, orgUserId: props.parent.id, token, isActive: true, isAdmin: true})).then(() => {
				setState({...state, title: 'Made Admin successfully', openSnack: true});
				Router.reload('/dashboard/members');
			})
		} else if (props.save === "Cancel Invite"){
			dispatch(cancelInvite({id: props.parent.id, token, selectedOrganizationId})).then(() => {
				setState({...state, title: 'Cancel Invite successfully', openSnack: true});
				Router.reload('/dashboard/members');
			})
		}
		handleDialogClose();
	}

	function handleSnackClose() {
		setState({ ...state, openSnack: false });
	}

	return (
		<>
			<Dialog
				open={props.open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleDialogClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>

				<DialogContent>
					<Typography className={classes.title}>
						{props.name}
					</Typography>
				</DialogContent>
				<DialogActions>
					{props.cancel.length > 0 ? <Button onClick={handleDialogClose} color="primary" variant="outlined" className={classes.typography}>
						{props.cancel}
					</Button> : <></>}

					<Button onClick={handleSaveChange} variant="contained" className={classes.buttonTypography}>
						{props.save}
					</Button>
				</DialogActions>

			</Dialog>
			<MySnackbar open={state.openSnack} handleClose={handleSnackClose} title={state.title} />
		</>
	);
}

export default MemberDialog;