import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import api from "../../../../services/api/api";


export const getMembers = createAsyncThunk('member/getMembers', async (params, {dispatch}) => {
	const response = await api(`v1/organizations/${params.selectedOrganizationId}/users`, params.token).get();
	const data = await response.data;
	return data;
});

export const getPendingMembers = createAsyncThunk('member/getPendingMembers', async (params, {dispatch}) => {
	const response = await api(`v1/organizations/${params.selectedOrganizationId}/invitations`, params.token).get();
	const data = await response.data;
	return data;
});

export const cancelInvite = createAsyncThunk('member/cancelInvite', async (params, {dispatch}) => {
	const response = await api(`v1/invitations/${params.id}`, params.token).destroy();
	const error = await response.error;
	if (!error) {
		return params.id;
	}
});

export const DeactivateMember = createAsyncThunk('member/DeactivateMember', async params => {
	const response = await api(`v1/organizations/${params.selectedOrganizationId}/user/${params.orgUserId}`, params.token).patch({isAdmin: params.isAdmin, isActive: params.isActive});
	const data = await response.data;
	return data;
});

export const ReactivateMember = createAsyncThunk('member/ReactivateMember', async params => {
	const response = await api(`v1/organizations/${params.selectedOrganizationId}/user/${params.orgUserId}`, params.token).patch({isAdmin: params.isAdmin, isActive: params.isActive});
	const data = await response.data;
	return data;
});

export const updateMemberRole = createAsyncThunk('member/updateMemberRole', async params => {
	const response = await api(`v1/organizations/${params.selectedOrganizationId}/user/${params.orgUserId}`, params.token).patch({isAdmin: params.isAdmin, isActive: params.isActive});
	const data = await response.data;
	return data;
});

export const getTotalCapacity = createAsyncThunk('member/getTotalCapacity', async params => {
	const response = await api(`v1/organizations/${params.selectedOrganizationId}/spaces`, params.token).get();
	const data = await response.data.spaces;
	return data;
});

const initialState = {
	isInitial: true,
	pendingMembers: [],
	members: [],
};

export const memberSlice = createSlice({
	name: 'member',
	initialState,
	reducers: {
		setInitialMembers: (state, action) => {
			state.members = _.orderBy(action.payload, ['role'], ['asc']);
		},
		
	},
	extraReducers: {
		[getPendingMembers.fulfilled]: (state, action) => {
			state.pendingMembers = action.payload;
		},
		[getMembers.fulfilled]: (state, action) => {
			state.members = action.payload.users;
		},
	}
});

export const { setInitialMembers } = memberSlice.actions;

export default memberSlice.reducer;



