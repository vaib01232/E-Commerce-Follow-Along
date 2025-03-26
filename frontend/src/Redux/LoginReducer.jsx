const initState = {
    email: null,
    password: null,
    loginSuccessful: false,
    loginError: null,
    loginAttempts: 0
};

export const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                loginSuccessful: true,
                loginError: null,
                loginAttempts: state.loginAttempts + 1
            };
        case 'LOGIN_SUCCESSFUL':
            return {
                ...state,
                loginSuccessful: true,
                loginError: null
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loginSuccessful: false,
                loginError: action.payload.error,
                loginAttempts: state.loginAttempts + 1
            };
        default:
            return state;
    }
};