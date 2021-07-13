import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";
import { Auth } from "aws-amplify";

const apiClient = create({
  baseURL: "https://rfpfs7fbe7.execute-api.us-west-2.amazonaws.com/dev",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const session = await Auth.currentSession();
  const idToken = session.getIdToken().getJwtToken(); //authStorage.getIdToken();

  if (!idToken) return;
  request.headers["Authorization"] = "Bearer " + idToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  // Before
  const response = await get(url, params, axiosConfig);
  // After

  if (response.ok) {
    cache.store(url, response.data);

    return response;
  } else {
  }

  const obj = await cache.get(url);

  const data = Object.values(obj);
  return data ? { ok: true, data } : response;
};

export default apiClient;
