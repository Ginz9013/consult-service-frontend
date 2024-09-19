import {
    AUTHENTICATE,
    DEAUTHENTICATE,
    SAVE_USER_NAME,
} from "../redux/types";
import { Dispatch } from "redux";

type AccessTokenData = {
    accessToken: string;
}

// 儲存 accessToken
export const storeAccessToken = (data: AccessTokenData) => (dispatch: Dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: data });
};