import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { queryClient } from "./util/HTTPArticles.ts";
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
import AnimalDetailPage from "./pages/animals/save_animals/AnimalDetailPage.tsx";
import LostAnimalDetailPage from "./pages/animals/lost_animals/LostAnimalDetailPage.tsx";
import AnimalFormPage from "./pages/animals/save_animals/AnimalFormPage.tsx";
import AnimalUpdatePage from "./pages/animals/save_animals/AnimalUpdatePage.tsx";
import LostAnimalUpdatePage from "./pages/animals/lost_animals/LostAnimalUpdatePage.tsx";
import LostAnimalFormPage from "./pages/animals/lost_animals/LostAnimalFormPage.tsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Page />,
  // },
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
        path: "save-animals/:animalID",
        element: <AnimalDetailPage />,
      },
      {
        path: "registration",
        element: <AnimalFormPage />,
      },
      {
        path: "save-update",
        element: <AnimalUpdatePage />,
      },
      {
        path: "lost-animals",
        element: <LostAnimalListPage />,
      },
      {
        path: "lost-animals/:animalID",
        element: <LostAnimalDetailPage />,
      },
      {
        path: "lost-registration",
        element: <LostAnimalFormPage />,
      },
      {
        path: "lost-update",
        element: <LostAnimalUpdatePage />,
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
    ],
  },
]);

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
