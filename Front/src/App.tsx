import { Suspense, lazy } from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import ReactModal from "react-modal";

import { queryClient } from "./util/tanstackQuery";
import "./App.css";
import MainPage from "./pages/home/HomePage.tsx";
const AnimalListPage = lazy(
  () => import("./pages/animals/save_animals/AnimalListPage")
);
import LostAnimalListPage from "./pages/animals/lost_animals/LostAnimalListPage";
import ArticleListPage from "./pages/articles/ArticleListPage";
import ArticleDetailPage from "./pages/articles/ArticleDetailPage";
import NavBar from "./components/common/NavBar";
import SignUpPage from "./pages/users/SignUpPage.tsx";
import SignInPage from "./pages/users/SignInPage.tsx";
import LandingPage from "./pages/home/LandingPage.tsx";
import AnimalDetailPage from "./pages/animals/save_animals/AnimalDetailPage.tsx";
import LostAnimalDetailPage from "./pages/animals/lost_animals/LostAnimalDetailPage.tsx";
import AnimalFormPage from "./pages/animals/save_animals/AnimalFormPage.tsx";
import AnimalUpdatePage from "./pages/animals/save_animals/AnimalUpdatePage.tsx";
import LostAnimalUpdatePage from "./pages/animals/lost_animals/LostAnimalUpdatePage.tsx";
import LostAnimalFormPage from "./pages/animals/lost_animals/LostAnimalFormPage.tsx";
import ArticleWritePage from "./pages/articles/ArticleWritePage";
import { LoadingIndicator } from "./components/common/Icons";
const BroadCastPage = lazy(() => import("./pages/broadcast/BroadCastPage"));
import ProfilePage from "./pages/users/ProfilePage.tsx";
import BoradcastListPage from "./pages/broadcast/BoradcastListPage.tsx";
import VisitManagementPage from "./pages/visits/VisitManagementPage.tsx";
import AnimalMatching from "./components/animalinfo/mungbti/AnimalMatching.tsx";
import MungBTIPage from "./pages/animals/mungbti_test/MungBTIPage.tsx";
import VisitReservationPage from "./pages/visits/VisitReservationPage.tsx";
import AboutDogCatDang from "./pages/about/AboutDogCatDang.tsx";
// import { loginOnly } from "./util/commonLoader.ts";

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
    path: "/about",
    element: <AboutDogCatDang />,
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
        path: "test",
        element: <AnimalMatching />,
      },
      {
        path: "mung",
        element: <MungBTIPage />,
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
        children: [
          {
            index: true,
            element: <LostAnimalListPage />,
          },
          {
            path: ":animalID",
            element: <LostAnimalDetailPage />,
          },
        ],
      },
      {
        path: "lost-registration",
        element: <LostAnimalFormPage />,
      },
      {
        path: "lost-update/:animalID",
        element: <LostAnimalUpdatePage />,
      },
      {
        path: "profile/:userId",
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: "visit",
            element: <VisitManagementPage />,
          },
        ],
      },
      {
        path: "articles/",
        loader: ({ request }) => {
          const url = request.url.split("/");
          if (url.length === 4 || url[4] === "") {
            return redirect("/articles/1");
          }
          return null;
        },
        element: <Outlet />,
        children: [
          {
            path: "search/:searchKey",
            element: <ArticleListPage />,
          },
          {
            path: ":page",
            element: <ArticleListPage />,
          },
          {
            path: "detail/:boardId/*",
            element: <ArticleDetailPage />,
          },
          {
            path: "new",
            children: [
              {
                index: true,
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
            path: "trans/*",
            element: (
              <Suspense fallback={<LoadingIndicator />}>
                <BroadCastPage />
              </Suspense>
            ),
          },
          {
            path: ":broadcastId",
            element: (
              <Suspense fallback={<LoadingIndicator />}>
                <BroadCastPage />
              </Suspense>
            ),
          },
          {
            path: "list",
            element: <BoradcastListPage />,
          },
        ],
      },
      {
        path: "visit/:shelterId/:animalId",
        element: <VisitReservationPage />,
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
