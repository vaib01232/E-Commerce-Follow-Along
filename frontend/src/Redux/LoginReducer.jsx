const token = localStorage.getItem("token");

let user = null;
try {
  user = JSON.parse(localStorage.getItem("user") || "null");
} catch {
  console.warn("⚠️ Error parsing user from localStorage");
  user = null;
}

const initState = {
  email: user?.email || null,
  name: user?.name || null,
  avatar: user?.avatar || null,
  token: token || null,
  loginSuccessful: !!token,
  loginError: null,
  loginAttempts: 0
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const { email, name, avatar, token } = action.payload;

      localStorage.setItem("user", JSON.stringify({ email, name, avatar }));
      localStorage.setItem("token", token);

      return {
        ...state,
        email,
        name,
        avatar,
        token,
        loginSuccessful: true,
        loginError: null,
        loginAttempts: state.loginAttempts + 1
      };
    }

    case 'LOGIN_SUCCESSFUL':
      return {
        ...state,
        loginSuccessful: true,
        loginError: null
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        email: null,
        name: null,
        avatar: null,
        token: null,
        loginSuccessful: false,
        loginError: action.payload.error,
        loginAttempts: state.loginAttempts + 1
      };

      case 'LOGOUT':
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      
        console.log("🧹 User logged out, state and localStorage cleared.");
      
        return {
          ...state,
          email: null,
          name: null,
          avatar: null,
          token: null,
          loginSuccessful: false,
          loginError: null,
          loginAttempts: 0
        };      

    default:
      return state;
  }
};

export default loginReducer;
