import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const cognitorequest = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (response.status === 200) {
      if (response.data.statusCode !== 200) {
        setError(true);
        setData(response.data.body.message);
        return response;
      }
      setError(false);
      setData(response.data);
      return response;
    } else {
      setError(true);
      setData(response.data.message);
    }

    return response;
  };

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    // console.log("response: ", response.data);
    setLoading(false);

    setError(!response.ok);
    setData(response.data);
    return response;
  };

  return { data, error, loading, cognitorequest, request };
};
