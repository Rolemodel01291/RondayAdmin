import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../services/api/api";
import {getSpaces} from "../../pages/dashboard/spaces/store/spaceSlice";


export const getOrganizations = createAsyncThunk('auth/getOrganizations', async token => {
	const response = await api(`v1/users/current/organizations`, token).get();
	const data = await response.data;
	return data;
});

export const createOrganization = createAsyncThunk('auth/createOrganization', async params => {
	const response = await api(`v1/organizations`, params.token).post({"DisplayName": params.displayName, "IsAutoEnrolled": params.isAutoEnrolled,"Domain": params.domain})
	const data = await response.data;
	return data;
});

export const deleteOrganization = createAsyncThunk('auth/deleteOrganization', async (params, {dispatch}) => {
	const response = await api(`v1/organizations/${params.selectedOrganizationId}`, params.token).destroy();
	const data = await response.data;
	return data;
});

export const updateOrganization = createAsyncThunk('auth/updateOrganization', async (params, {dispatch}) => {
	const response = await api(`v1/organizations/${params.selectedOrganizationId}`, params.token).put({"DisplayName": params.displayName, "IsAutoEnrolled": params.isAutoEnrolled, "Domain": params.domain});
	const data = await response.data;
	dispatch(getOrganizations(params.token));
	return data;
});

export const sendInvite = createAsyncThunk('auth/sendInvite', async params => {
	const response =  await api(`v1/invitations`, params.token).post({"Emails": params.emails, "OrganizationId": params.selectedOrganizationId});
	const data = await response.data;
	return data;
});

export const getUser = createAsyncThunk("user/GetUser", async (params) => {
	const response = await api(`v1/users/current`, params.token).get();
	return await response.data;
});

export const reGenerateInviteLink = createAsyncThunk("auth/reGenerateInviteLink", async (params) => {
	const response = await api(`v1/organizations/${params.selectedOrganizationId}/invitelink`, params.token).post();
	return await response.data;
});

export const getInviteLink = createAsyncThunk("auth/getInviteLink", async (params)=> {
	const response = await api(`v1/organizations/${params.selectedOrganizationId}/invitelink`, params.token).get();
	return await response.data;
});

export const getInvitations = createAsyncThunk("auth/getInvitations", async token => {
	const response = await api(`v1/users/current/invitations`, token).get();
	return await response.data;
});

export const acceptInvite = createAsyncThunk("auth/acceptInvite", async link => {
	const response = await api(`v1/invitations/${link}`).get();
	return await response.data;
});

export const acceptInvitePost = createAsyncThunk("auth/acceptInvitePost", async (params) => {
	const response = await api(`v1/invitations/${params.inviteId}`, params.token).post();
	return await response.data;
});

export const deleteInvitation = createAsyncThunk("auth/deleteInvitation", async (params) => {
	const response = await api(`v1/invitations/${params.ShareableInviteLink}`, params.token).destroy();
	return await response.data;
});


const initialState = {
	user: null,
	authentication: [],
	token: " ",
	organizations: [],
	selectedOrganizationId: "",
	ShareableInviteLink: "",
	isCreateInvite: false,
	path: " ",
	invitations: [],
	invitedUser: null,
	invitedOrg: '',
	acceptedOrgId: null,
	acceptedOrgName: null,
	isNotMatching: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
            setAuthentication: (state, action) => {
                state.authentication = action.payload
            },
			setHeader: (state, action) => {
				state.token = action.payload;
			},
			setSelectedOrganizationId: (state, action) => {
				state.selectedOrganizationId = action.payload;
			},
			setShareableInviteLink: (state, action) => {
				state.ShareableInviteLink = action.payload;
			},
			setIsCreateInvite: (state, action) => {
				state.isCreateInvite = action.payload
			},
			setPathForInvite: (state, action) => {
				state.path = action.payload;
			},
			setAcceptedOrgName: (state, action) => {
				state.acceptedOrgName = action.payload;
			},
			setIsNotMatching: (state, action) => {
				state.isNotMatching = action.payload;
			}

		},
		
	extraReducers: {
		[getOrganizations.fulfilled]: (state, action) => {
			state.organizations = action.payload;
		},
		[createOrganization.fulfilled]: (state, action) => {
			state.selectedOrganizationId = action.payload.organizationId;
			let temp = state.organizations ? [...state.organizations, action.payload] : [action.payload];
			state.organizations = [...temp];
		},
		[getUser.fulfilled]: (state, action) => {
			state.user = { ...action.payload };
		},
		[getInviteLink.fulfilled]: (state, action) => {
			state.ShareableInviteLink = action.payload.orgLinkInviteId;
		},
		// [getInvitations.fulfilled]: (state, action) => {
		// 	state.invitations = action.payload;
		// },
		[acceptInvite.fulfilled]: (state, action) => {
			state.invitedOrg = action.payload;
		},
		// [acceptInvitePost.fulfilled]: (state, action) => {
		// 	state.acceptedOrgId = action.payload.organizationId;
		// }
	}
});

export const {
	setAuthentication,
	setHeader,
	setSelectedOrganizationId,
	setShareableInviteLink,
	setIsCreateInvite,
	setPathForInvite,
	setAcceptedOrgName,
	setIsNotMatching
} = authSlice.actions;

export default authSlice.reducer;



