import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../../../services/api/api";
import _ from 'lodash';


export function IsProfessional(sceneId) {
	const professional = [100, 110, 120, 400, 500, 666, 667];
	return professional.includes(sceneId)? true : false;
}

export const getSpace = createAsyncThunk('space/getSpace', async params => {
	const response = await api(`v1/spaces/${params.spaceId}`, params.token).get();
	const data = await response.data;
	return data;
});

export const getSpaces = createAsyncThunk('space/getSpaces', async params => {
	const response = await api(`v1/organizations/${params.selectedOrganizationId}/spaces`, params.token).get();
	const data = await response.data;
	return data;
});


export const getProfessionalSpaces = createAsyncThunk('space/getProfessionalSpaces', async token => {
	const response = await api('v1/spaces/types', token).get();
	const data = await response.data;
	let result = data.filter(({ sceneId }) => IsProfessional(sceneId))
	return result;
});

export const getSocialSpaces = createAsyncThunk('space/getSocialSpaces', async token => {
	const response = await api('v1/spaces/types', token).get();
	const data = await response.data;
	let result = data.filter(({ sceneId }) => !IsProfessional(sceneId))
	return result;
});

export const getSpaceTypes = createAsyncThunk('space/getSpaceTypes', async token => {
	const response = await api('v1/spaces/types', token).get();
	const data = await response.data;
	return data;
});


export const addSpace = createAsyncThunk('space/addSpace', async (params, {dispatch}) => {
	const response = await api('v1/spaces', params.token).post({DisplayName: params.DisplayName, SpaceTypeId: params.SpaceTypeId, OrganizationId: params.selectedOrganizationId, ConferenceRoomNames: params.conferenceRooms});
	const data = await response.data;
	dispatch(getSpaces({selectedOrganizationId:params.selectedOrganizationId,token: params.token}));
	return data;
});

export const updateSpace = createAsyncThunk('space/updateSpace', async (params, {dispatch}) => {
	const response = await api(`v1/spaces/${params.spaceId}`, params.token).put({DisplayName: params.displayName, accentColor: params.accentColor, ConferenceRoomNames: params.conferenceRoomNames});
	const data = await response.data;
	dispatch(getSpace({spaceId:params.spaceId,token: params.token}));
	return data;
});

export const deleteSpace = createAsyncThunk('space/deleteSpace', async params => {
	const response = await api(`v1/spaces/${params.spaceId}`, params.token).destroy();
	const data = await response.data;
	dispatch(getSpaces({selectedOrganizationId:params.selectedOrganizationId,token: params.token}));
	return data;
});

export function updateSpaceInfo(props) {
	return async (dispatch) => {
		try {
			dispatch(changeSpaceInfo(props));
		} catch (error) {
			console.log(error);
		}
	};
}

export function setSpaceSize(space) {
	return async (dispatch) => {
		try {
			dispatch(setFocusedSpace(space));
		} catch (error) {
			console.log(error);
		}
	}
}

const initialState = {
	socialSpaces: [],
	professionalSpaces: [],
	addedSpaces: [],
	selectedSpaceSize: {},
	conferenceRooms: {},
	isEditAttr: {},
	duplicateCount: 0,
	isUpdate: false,                // Update conference room
	spaceTypes: []
};

let temp = [];

export const spaceSlice = createSlice({
	name: 'space',
	initialState,
	reducers: {
		setSocialSpaces: (state, action) => {
			state.socialSpaces = action.payload
		},
		setProfessionalSpaces: (state, action) => {
			state.professionalSpaces = action.payload;
		},
		addNewSpace: (state, action) => {
			temp = [...temp, action.payload]
			state.addedSpaces = temp;
		},
		changeSpace: (state, action) => {
			let temp = [...state.addedSpaces];
			let spaceTypeId = action.payload.changedSpaceTypeId;
			let maxCapacity = action.payload.changedMaxCapacity;
			let spaceId = action.payload.changedSpaceId;
			let spaceType = {...temp.find(x => x.spaceId === spaceId).spaceType};
			spaceType.maxCapacity = maxCapacity;
			temp[action.payload.index].size = action.payload.size;
			temp[action.payload.index].type = action.payload.type;
			state.addedSpaces = temp;
		},
		changeSpaceInfo: (state, action) => {
			let temp = [...state.addedSpaces];
			const { index, ...result } = action.payload;
			temp.splice(action.payload.index, 1, result);
			state.addedSpaces = temp;
		},
		removeSpace: (state, action) => {
			let temp = [...state.addedSpaces];
			let result = _.reject(temp, { title: action.payload });
			state.addedSpaces = result;
		},
		setIsEdit: (state, action) => {
			state.isEditAttr = action.payload;
		},
		setDuplicateCount: (state, action) => {
			state.duplicateCount = action.payload;
		},
		setFocusedSpace: (state, action) => {
			state.selectedSpaceSize = action.payload;
		},
		setConferenceRooms: (state, action) => {
			state.conferenceRooms = action.payload;
		},
		changeConferenceRoom: (state, action) => {
			let temp = {...action.payload.rooms};
			let result = [...temp[action.payload.pid]];
			let index = action.payload.index;
			result[index] = action.payload.item;
			let final = {[action.payload.pid]: result};
			state.conferenceRooms = final;			
		},
		setIsUpdateConferenceroom: (state, action) => {
			state.isUpdate = action.payload;
		}

	},
	extraReducers: {
		[getSpaces.fulfilled]: (state, action) => {
			state.addedSpaces = action.payload.spaces;
		},
		[getProfessionalSpaces.fulfilled]: (state, action) => {
			state.professionalSpaces = action.payload;
		},
		[getSocialSpaces.fulfilled]: (state, action) => {
			state.socialSpaces = action.payload;
		},
		[getSpaceTypes.fulfilled]: (state, action) => {
			state.spaceTypes = action.payload;
		},
		[addSpace.fulfilled] : (state, action) => {
			let temp = [...state.addedSpaces];
			temp.push(action.payload);
			state.addedSpaces = temp;
			//state.conferenceRooms = action.payload.conferenceRooms;
		}
	}
});

export const {
	setProfessionalSpaces,
	addNewSpace, changeSpaceInfo,
	removeSpace, setFocusedSpace,
	setIsEdit, setDuplicateCount } = spaceSlice.actions;

export default spaceSlice.reducer;



