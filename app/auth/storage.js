import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

// const key = "authToken";
const key1 = "accessToken";
const key2 = "idToken";

const storeAccessToken = async (accessToken) => {
  try {
    await SecureStore.setItemAsync(key1, accessToken);
  } catch (error) {}
};

const getAccessToken = async () => {
  try {
    return await SecureStore.getItemAsync(key1);
  } catch (error) {}
};

const removeAccessToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key1);
  } catch (error) {}
};
////////////////////////////////////////////////////////////
const storeIdToken = async (idToken) => {
  try {
    await SecureStore.setItemAsync(key2, idToken);
  } catch (error) {}
};

const getIdToken = async () => {
  try {
    return await SecureStore.getItemAsync(key2);
  } catch (error) {}
};

const removeIdToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key2);
  } catch (error) {}
};

const getUser = async () => {
  const idToken = await getIdToken();
  return idToken ? jwtDecode(idToken) : null;
};

export default {
  storeAccessToken,
  getAccessToken,
  removeAccessToken,
  storeIdToken,
  getIdToken,
  removeIdToken,
  getUser,
};
