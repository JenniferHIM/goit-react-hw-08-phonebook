export const getContacts = state => state.phoneBook.contacts;
export const getFilter = state => state.phoneBook.filter;

export const getVisibleContacts = state => {
  const arr = getContacts(state);
  const filter = getFilter(state);

  return arr.filter(el => el.name.toLowerCase().includes(filter.toLowerCase()));
};