import { useForm } from '../../@ronday/hooks';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import ChecklistItemModel from '../ChecklistItemModel/ChecklistItemModel';
import React, { useState } from 'react';
import validator from 'validator'

const useStyles = makeStyles({
	fab: {
		marginLeft: 4,
		marginRight: 4
	},
	notchedOutline: {
		borderWidth: "1px",
		borderColor: "black !important"
	}
});

const StyledTextField = withStyles({
	root: {
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderRadius: '0',
			},
		},
	},
})(TextField);


function CardAddChecklistItem(props) {
	const classes = useStyles();
	const { form, handleChange, resetForm } = useForm({
		name: ''
	});

	const [emailError, setEmailError] = useState('')

	function isFormInValid() {
		//setEmailError('Enter Valid Email');
		return !validator.isEmail(form.name)
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		if (isFormInValid()) {
			return;
		}
		props.onListItemAdd(new ChecklistItemModel(form));
		resetForm();
	}

	function handleTextChange(event) {

		
		handleChange(event)
	}

	function handleError(){
		if (validator.isEmail(form.name)) {
			setEmailError("");
		} else {
			setEmailError("Please enter valid email address");
		}
	}


	return (
		<form onSubmit={handleSubmit}>
			<ListItem className="px-0" dense>
				{/*<span className="w-80" />*/}

				<StyledTextField
					error
					className="flex flex-1"
					name="name"
					InputProps={{
						classes: {
							notchedOutline: classes.notchedOutline
						}
					}}
					value={form.name}
					onChange={handleTextChange}
					onBlur={handleError}
					variant="outlined"
					helperText={emailError}
				/>

				<Fab
					className={clsx(classes.fab)}
					aria-label="Add"
					size="small"
					color="primary"
					type="submit"
					disabled={isFormInValid()}
				>

					<AddIcon />
				</Fab>


			</ListItem>
		</form>
	);
}

export default CardAddChecklistItem;
