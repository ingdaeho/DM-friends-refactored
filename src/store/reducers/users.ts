import produce from "immer";

export const INITIAL_STATE = {
  signupLoading: false,
  signupDone: false,
  signupError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
};

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const loginRequestAction = (data: { email: string; password: string }) => ({
  type: LOGIN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOGOUT_REQUEST,
});

const reducer = (state = INITIAL_STATE, action: { type: any; error: null; data: null }) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        draft.signupError = null;
        draft.signupDone = false;
        break;
      case SIGNUP_SUCCESS:
        draft.signupDone = true;
        break;
      case SIGNUP_FAILURE:
        draft.signupError = action.error;
        break;
      case LOGIN_REQUEST:
        draft.loginError = null;
        draft.loginDone = false;
        break;
      case LOGIN_SUCCESS:
        draft.loginDone = true;
        break;
      case LOGIN_FAILURE:
        draft.loginError = action.error;
        break;
      case LOGOUT_REQUEST:
        draft.logoutError = null;
        draft.logoutDone = false;
        break;
      case LOGOUT_SUCCESS:
        draft.logoutDone = true;
        break;
      case LOGOUT_FAILURE:
        draft.logoutError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
