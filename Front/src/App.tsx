import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import MainPage from "./Pages/main/MainPage";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Navigate to={}></Navigate>,
  // },
  {
    path: "/",
    element: <MainPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
