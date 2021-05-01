import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "https://rfpfs7fbe7.execute-api.us-west-2.amazonaws.com/dev",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const idToken = await authStorage.getIdToken();
  // console.log(idToken);

  if (!idToken) return;
  request.headers["Authorization"] = "Bearer " + idToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  // Before
  const response = await get(url, params, axiosConfig);
  // After

  // console.log("response:", response);

  if (response.ok) {
    cache.store(url, response.data);

    return response;
  }

  const obj = await cache.get(url);

  const data = Object.values(obj);
  return data ? { ok: true, data } : response;
};

export default apiClient;
