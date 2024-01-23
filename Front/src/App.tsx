import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { queryClient } from "./util/HTTPArticles.ts";
import { QueryClientProvider } from "@tanstack/react-query";

import MainPage from "./pages/main/MainPage";
import AnimalListPage from "./pages/animals/save_animals/AnimalListPage";
import LostAnimalListPage from "./pages/animals/lost_animals/LostAnimalListPage";
import ArticleListPage from "./pages/articles/ArticleListPage";
import ArticleDetail from "./pages/articles/ArticleDetail";
import NavBar from "./components/common/NavBar.tsx";
import SignUp from "./components/users/auth/SignUp.tsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Page />,
  // },
  {
    path: "/",
    element: (
      <>
        <NavBar />
      </>
    ),
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "save-animals",
        element: <AnimalListPage />,
      },
      {
        path: "lost-animals",
        element: <LostAnimalListPage />,
      },
      {
        path: "articles",
        element: <></>,
        children: [
          {
            index: true,
            element: <ArticleListPage />,
          },
          {
            path: "write",
            element: <ArticleDetail />,
          },
        ],
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
