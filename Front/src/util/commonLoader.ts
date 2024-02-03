import { store } from "../stores/store";
import { redirect } from "react-router-dom";

export const loginOnly = () => {
  const isLogin = store.getState().user.isUser;
  if (!isLogin) {
    return redirect("/landing");
  }
  return null;
};
