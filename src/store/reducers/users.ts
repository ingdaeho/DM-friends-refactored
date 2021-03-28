import produce from "immer";

export const INITIAL_STATE = {
  signupLoading: false,
  signupDone: false,
  signupError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  me: null,
};

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const reducer = (state = INITIAL_STATE, action: { type: any; error: null; data: null }) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        draft.signupLoading = true;
        draft.signupError = null;
        draft.signupDone = false;
        break;
      case SIGNUP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        break;
      case SIGNUP_FAILURE:
        draft.loginLoading = false;
        draft.signupError = action.error;
        break;
      case LOGIN_REQUEST:
        draft.loginLoading = true;
        draft.loginError = null;
        draft.loginDone = false;
        break;
      case LOGIN_SUCCESS:
        draft.loginLoading = false;
        draft.me = action.data;
        draft.loginDone = true;
        break;
      case LOGIN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
