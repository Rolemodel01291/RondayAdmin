import {getOrganizations, getUser} from "../../components/store/authSlice";

const isTokenExpired = async (token) => {
    const user = await dispatch(getUser({ token }));
    if (!user.payload) {
        localStorage.clear();
        localStorage.removeItem('root')
        logout();
    }else {
        setUser(user.payload);
    }
    const organizations = await dispatch(getOrganizations(token));
    getMemberCountsCallback(organizations.payload);
};

