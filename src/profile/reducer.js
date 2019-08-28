import { handleProfileSubmit } from "./actions";
import { handleActions } from "redux-actions";

export const profileReducer = handleActions(
  {
    [handleProfileSubmit]: (state, action) => action.payload
  },
  null
);
