import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';


export function setOrganizationType(type) {
	return async (dispatch) => {
	  try {
		dispatch(setOrgType(type));
	  } catch (error) {
		console.log(error);
	  }
	};
}


export function setOrganizationSize(number) {
	return async (dispatch) => {
	  try {
		dispatch(setOrgSize(number));
	  } catch (error) {
		console.log(error);
	  }
	};
}

export function setOrganizationStyle(style) {
	return async (dispatch) => {
		try {
			dispatch(clientSlice.actions.setOrgStyle(style));
		} catch (error) {
			console.log(error);
		}
	};
}


export function setOrganizationName(name) {
	return async (dispatch) => {
		try {
			dispatch(clientSlice.actions.setOrgName(name));
		} catch (error) {
			console.log(error);
		}
	};
}

export function addNewCheckItem(item){
	return async (dispatch) => {
		try{
			dispatch(clientSlice.actions.addCheckItems(item));
		} catch (error) {
			console.log(error);
		}
	};
}

export function removeItem(id) {
	return async (dispatch) => {
		try {
			dispatch(clientSlice.actions.removeCheckItem(id));
		} catch (error) {
			console.log(error);
		}
	}
}

export function updateItem(item, _index) {
	return async (dispatch) => {
		try {
			dispatch(clientSlice.actions.updateCheckItem({item: item, index: _index}));
		} catch (error) {
			console.log(error);
		}
	}
}




const initialState = {
	selectedOrgType: {org: "", focus: null},
	selectedOrgSize: {},
	selectedOrgStyle: {},
	selectedOrgName: "",
	selectedCheckItems: [],
	organizationId: "",
};

export const clientSlice = createSlice({
	name: 'client',
	initialState,
	reducers: {
		setOrgType: (state, action) => {
			state.selectedOrgType = action.payload
		},
		setOrgSize: (state, action) => {
			state.selectedOrgSize = action.payload;
		},
		setOrgStyle: (state, action) => {
			state.selectedOrgStyle = action.payload;
		},
		setOrgName: (state, action) => {
			state.selectedOrgName = action.payload;
		},
		addCheckItems: (state, action) => {
			let temp = [...state.selectedCheckItems];
			temp.push(action.payload);
			state.selectedCheckItems = temp;
		},
		removeCheckItem: (state, action) => {
			let id = action.payload;
			let temp = [...state.selectedCheckItems];
			let result = _.reject(temp, { id });
			state.selectedCheckItems = result;
		},
		updateCheckItem: (state, action) => {
			let index = action.payload.index;
			let item = action.payload.item;
			let temp = state.selectedCheckItems;
			temp[index] = item;
			state.selectedCheckItems = temp;
		},
		setOrganizationId: (state, action) => {
			state.organizationId = action.payload;
		}

	},
	extraReducers: {

	}
});

export const { setOrgSize, setOrgStyle, setOrgName, setOrgType, addCheckItems, removeCheckItem, setOrganizationId } = clientSlice.actions;

export default clientSlice.reducer;



