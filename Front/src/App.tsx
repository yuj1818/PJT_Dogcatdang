import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import MainPage from "./pages/main/MainPage";
import AnimalListPage from "./pages/animals/save_animals/AnimalListPage";
import LostAnimalListPage from "./pages/animals/lost_animals/LostAnimalListPage";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Navigate to={}></Navigate>,
  // },
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/save-animals",
    element: <AnimalListPage />,
  },
  {
    path: "/lost-animals",
    element: <LostAnimalListPage />,
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
