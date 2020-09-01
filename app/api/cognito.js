import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const cognitoClient = create({
  baseURL: "https://1scvbw6i67.execute-api.us-east-1.amazonaws.com/dev",
});

cognitoClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getAccessToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

const get = cognitoClient.get;
cognitoClient.get = async (url, params, axiosConfig) => {
  // Before
  const response = await get(url, params, axiosConfig);
  // After

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default cognitoClient;
