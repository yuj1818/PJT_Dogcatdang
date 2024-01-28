import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { queryClient } from "./util/HTTP.ts";
import { QueryClientProvider } from "@tanstack/react-query";

import MainPage from "./pages/home/HomePage.tsx";
import AnimalListPage from "./pages/animals/save_animals/AnimalListPage";
import LostAnimalListPage from "./pages/animals/lost_animals/LostAnimalListPage";
import ArticleListPage from "./pages/articles/ArticleListPage";
import ArticleDetailPage from "./pages/articles/ArticleDetailPage.tsx";
import NavBar from "./components/common/NavBar.tsx";
import SignUpPage from "./pages/users/SignUpPage.tsx";
import SignInPage from "./pages/users/SignInPage.tsx";
import LandingPage from "./pages/home/LandingPage.tsx";
import ArticleWritePage from "./pages/articles/ArticleWritePage.tsx";
import ErrorBlock from "./components/common/Error.tsx";
import ReactModal from "react-modal";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Page />,
  // },
  {
    path: "/error",
    element: <ErrorBlock />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        index: true,
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
        children: [
          {
            index: true,
            element: <ArticleListPage />,
          },
          {
            path: ":boardId",
            element: <ArticleDetailPage />,
          },
          {
            path: "new",
            children: [
              {
                index: true,
                element: <ArticleWritePage />,
              },
              {
                path: ":boardId",
                element: <ArticleWritePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
ReactModal.setAppElement("#root");
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
