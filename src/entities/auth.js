import AuthService from "../services/AuthService";

export const initialState = {
  isValid: false,
};

export const authenticate = (auth) => (userName, password) => async () => {
  const res = await AuthService();

  auth.setState({ isValid: res });
};
