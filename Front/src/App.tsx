import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import ReactModal from "react-modal";

import { queryClient } from "./util/HTTP.ts";
import "./App.css";
import MainPage from "./pages/home/HomePage.tsx";
const AnimalListPage = lazy(
  () => import("./pages/animals/save_animals/AnimalListPage")
);
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
import ArticleWritePage from "./pages/articles/ArticleWritePage.tsx";
import ErrorBlock from "./components/common/Error.tsx";
import { LoadingIndicator } from "./components/common/Icons.tsx";
import BroadCastPage from "./pages/broadcast/BroadCastPage.tsx";
import ProfilePage from "./pages/users/ProfilePage.tsx";
// import { loginOnly } from "./util/commonLoader.ts";

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
    // loader: loginOnly,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "save-animals",
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <AnimalListPage />
          </Suspense>
        ),
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
        path: "save-update/:animalID",
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
        path: "profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "articles",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingIndicator />}>
                <ArticleListPage />
              </Suspense>
            ),
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
      {
        path: "broadcast",
        children: [
          {
            path: "trans",
            element: <BroadCastPage />,
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
