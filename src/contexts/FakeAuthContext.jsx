import { useReducer } from "react";
import { AuthContext } from "./createAuthContext";

const FAKE_USER = {
  name: "Jane",
  email: "xepime3297@marchub.com",
  password: "7775570217asd",
  avatar: "https://i.pravatar.cc/100?u=zf",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...initialState };
    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: { ...FAKE_USER } });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
