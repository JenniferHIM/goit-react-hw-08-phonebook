export const getAuthStatus = state => state.auth.isLoggedIn;
export const getUserName = state => state.auth.user.name;
export const getToken = state => state.auth.token;
export const getFetchingStatus = state => state.auth.isFetchingAuth;
export const getErrorStatus = state => state.auth.error;

export const getContacts = state => state.phoneBook.contacts;
export const getFilter = state => state.phoneBook.filter;

export const getVisibleContacts = state => {
    const arr = getContacts(state);
    const filter = getFilter(state);

    return arr.filter(el =>
        el.contactName.toLowerCase().includes(filter.toLowerCase()),
    );
};