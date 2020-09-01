import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

// const key = "authToken";
const key1 = "accessToken";
const key2 = "idToken";

const storeAccessToken = async (accessToken) => {
  try {
    await SecureStore.setItemAsync(key1, accessToken);
  } catch (error) {
    console.log("Error storing the access token", error);
  }
};

const getAccessToken = async () => {
  try {
    return await SecureStore.getItemAsync(key1);
  } catch (error) {
    console.log("Error getting the access token", error);
  }
};

const removeAccessToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key1);
  } catch (error) {
    console.log("Error removing the access token", error);
  }
};
////////////////////////////////////////////////////////////
const storeIdToken = async (idToken) => {
  try {
    await SecureStore.setItemAsync(key2, idToken);
  } catch (error) {
    console.log("Error storing the id token", error);
  }
};

const getIdToken = async () => {
  try {
    return await SecureStore.getItemAsync(key2);
  } catch (error) {
    console.log("Error getting the id token", error);
  }
};

const removeIdToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key2);
  } catch (error) {
    console.log("Error removing the id token", error);
  }
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
  //   getIdToken,
  removeIdToken,
  getUser,
};
