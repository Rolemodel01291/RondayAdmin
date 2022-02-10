import { createSlice } from '@reduxjs/toolkit';

export function setOrganizationStyle(style) {
	return async (dispatch) => {
		try {
			dispatch(familySlice.actions.setOrgStyle(style));
		} catch (error) {
			console.log(error);
		}
	};
}


export function setOrganizationName(name) {
	return async (dispatch) => {
		try {
			dispatch(familySlice.actions.setOrgName(name));
		} catch (error) {
			console.log(error);
		}
	};
}


const initialState = {
	selectedOrgSize: "",
	selectedOrgStyle: {},
	selectedOrgName: "",
	organizationId: ""
};

export const familySlice = createSlice({
	name: 'family',
	initialState,
	reducers: {
		setOrgSize: (state, action) => {
			state.selectedOrgSize = action.payload;
		},
		setOrgStyle: (state, action) => {
			state.selectedOrgStyle = action.payload;
		},
		setOrgName: (state, action) => {
			state.selectedOrgName = action.payload;
		},

	},
	extraReducers: {

	}
});

export const { setOrgSize, setOrgStyle, setOrgName } = familySlice.actions;

export default familySlice.reducer;



