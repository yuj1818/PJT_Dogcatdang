import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { queryClient } from "./util/HTTPArticles.ts";
import { QueryClientProvider } from "@tanstack/react-query";

import MainPage from "./Pages/home/HomePage.tsx";
import AnimalListPage from "./Pages/animals/save_animals/AnimalListPage";
import LostAnimalListPage from "./Pages/animals/lost_animals/LostAnimalListPage";
import ArticleListPage from "./Pages/articles/ArticleListPage";
import ArticleDetailPage from "./Pages/articles/ArticleDetailPage.tsx";
import NavBar from "./components/common/NavBar.tsx";
import SignUp from "./components/users/auth/SignUp.tsx";
import SignIn from "./components/users/auth/SignIn.tsx";
import styles from "./App.module.css";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Page />,
  // },
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
            path: ":id",
            element: <ArticleDetailPage />,
          },
        ],
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
  },
]);

function App() {
  return (
    <div className={styles.container}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
