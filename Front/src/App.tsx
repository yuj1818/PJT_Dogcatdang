import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { queryClient } from "./util/HTTPArticles.ts";

import MainPage from "./Pages/main/MainPage";
import ArticleListPage from "./Pages/articles/ArticleListPage";
import ArticleDetail from "./Pages/articles/ArticleDetail";
import { QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/common/NavBar.tsx";

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
