export const initialState = {
  baseUrl: false,
};

export const authenticate = (auth) => (userName, password) => async () => {
  const res = await AuthService();

  auth.setState({ isValid: res });
};
