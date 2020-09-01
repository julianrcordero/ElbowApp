import cognitoClient from "./cognito";

const signup = (userInfo) => cognitoClient.post("./signup", userInfo);
// const signup = (name, email, password, phone_number) =>
//   cognitoClient.post("/signup", { name, email, password, phone_number });

export default { signup };
