import React from 'react';
import { useForm, useUpdateEffect } from '../../@ronday/hooks';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles({  
    textField: {
        marginLeft: 8,
		marginRight: 8,
	},
	checkbox: {
		margin: 4
	},
	iconButton: {
		backgroundColor: 'blue'
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

function CardChecklistItem(props) {
	const classes = useStyles();
	const { item, onListItemChange, index} = props;
	const { form, handleChange } = useForm(item);

	useUpdateEffect(() => {
		onListItemChange(form, index);
	}, [form, index, onListItemChange]);

	if (!form) {
		return null;
	}

	
	return (
		<ListItem key={form.id} dense>
			{/*<span className="w-80" />*/}
			{/* <Checkbox checked={form.checked} name="checked" onChange={handleChange} tabIndex={-1} disableRipple className={clsx(classes.checkbox)} color="primary"/> */}
			<StyledTextField
				className='flex flex-1'
				name="name"
				value={form.name}
				onChange={handleChange}
				variant="outlined"
			/>
			<IconButton aria-label="Delete" onClick={props.onListItemRemove}>
				<DeleteIcon color="primary"/>
			</IconButton>
		</ListItem>
	);
}

export default CardChecklistItem;
