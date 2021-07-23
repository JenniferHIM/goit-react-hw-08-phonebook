import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getContacts,
  addContactsRequest,
  deleteContactsRequest,
} from 'services/api-services';

export const fetchContacts = createAsyncThunk(
  'phoneBook/fetchContacts',
  async () => {
    const contacts = await getContacts();
    return contacts;
  },
);

export const addContacts = createAsyncThunk(
  'phoneBook/add',
  async newObject => {
    const contacts = await addContactsRequest(newObject);
    return contacts;
  },
);

export const deleteContacts = createAsyncThunk('phoneBook/delete', async id => {
  return await deleteContactsRequest(id);
});