import { redirect } from "react-router-dom";

export const articleLoader = ({ request }: { request: Request }) => {
  const url = request.url.split("/");
  if (url.length === 4 || url[4] === "") {
    return redirect("/articles/1");
  }
  return null;
};
