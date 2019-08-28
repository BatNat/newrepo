import { handleLoginSubmit, handleUnauthorize } from "./actions";
import { handleActions } from "redux-actions";

export const loginReducer = handleActions(
  {
    [handleLoginSubmit]: () => true,
    [handleUnauthorize]: () => false
  },
  false
);
