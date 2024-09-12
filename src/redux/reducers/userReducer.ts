import {
  SAVE_USER_NAME,
  REMOVE_USER_NAME,
  SAVE_USER_PIC,
  REMOVE_USER_PIC
} from "@/redux/types";

type State = {
    user_name: null | string;
    user_pic: null | string;
};

type Action =
    { type: typeof SAVE_USER_NAME; payload: string }
  | { type: typeof REMOVE_USER_NAME }
  | { type: typeof SAVE_USER_PIC; payload: string }
  | { type: typeof REMOVE_USER_PIC };

const initialState: State = {
    user_name: null,
    user_pic: null,
};

const UserNameReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case SAVE_USER_NAME:
            return { ...state, user_name: action.payload };
        case REMOVE_USER_NAME:
            return { ...state, user_name: null };
        case SAVE_USER_PIC:
            return { ...state, user_pic: action.payload };
        case REMOVE_USER_PIC:
            return { ...state, user_pic: null };
        default:
            return state;
    }
};

export default UserNameReducer;
