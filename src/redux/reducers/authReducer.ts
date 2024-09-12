import {
  AUTHENTICATE,
  DEAUTHENTICATE
} from "../types";

type State = {
  token: string | null;
};

type Action = 
    { type: typeof AUTHENTICATE; payload: string }
  | { type: typeof DEAUTHENTICATE };

const initialState: State = {
  token: null,
};

const AuthReducer =  (state: State = initialState, action: Action) => {
  switch (action.type) {
      case AUTHENTICATE:
          return { ...state, token: action.payload };
      case DEAUTHENTICATE:
          return { ...state, token: null };
      default:
          return state;
  }
};

export default AuthReducer;