import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const apiClient = create({
  // baseURL: "http://192.168.1.181:9000/api",
  // baseURL: "http://192.168.254.65:9000/api", //AT HOME
  baseURL: "http://10.101.5.178:9000/api", //AT GTY
  // baseURL: "https://localhost:44364/api/values",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getAccessToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  // Before
  const response = await get(url, params, axiosConfig);
  // After

  console.log(response);

  if (response.ok) {
    cache.store(url, response.data);

    return response;
  }

  const obj = await cache.get(url);
  const data = Object.values(obj);
  return data ? { ok: true, data } : response;
};

export default apiClient;
