import { isRejected } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://goit-phonebook-api8.herokuapp.com';

// Auth requests
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const registerRequest = async newUser => {
  try {
    const { data } = await axios.post('/users/signup', newUser);
    token.set(data.token);
    return data;
  } catch (error) {
    toast.error(`Registration error. ${error.message}`);
    return new Promise(isRejected);
  }
};

export const loginRequest = async user => {
  try {
    const { data } = await axios.post('/users/login', user);
    token.set(data.token);
    return data;
  } catch (error) {
    toast.error(`Login error. ${error.message}`);
    return new Promise(isRejected);
  }
};

export const logoutRequest = async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {
    toast.error(`Logout error. ${error.message}`);
    return new Promise(isRejected);
  }
};

export const checkCurrent = async persistedToken => {
  token.set(persistedToken);
  try {
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    toast.error(`CheckCurrent error. ${error.message}`);
    return new Promise(isRejected);
  }
};

// Contacts requests
export async function getContacts() {
  try {
    const { data } = await axios.get('/contacts');
    return data;
  } catch (error) {
    toast.error(`Getting Contacts error. ${error.message}`);
    return new Promise(isRejected);
  }
}

export async function addContactsRequest(newObject) {
  try {
    const { data } = await axios.post('/contacts', newObject);
    return data;
  } catch (error) {
    toast.error(`Adding new contact error. ${error.message}`);
    return new Promise(isRejected);
  }
}

export async function deleteContactsRequest(id) {
  try {
    await axios.delete(`/contacts/${id}`);
    return id;
  } catch (error) {
    toast.error(`Deleting contact error. ${error.message}`);
    return new Promise(isRejected);
  }
}

