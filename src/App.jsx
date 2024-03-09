import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  HomeLayout,
  Error,
  Landing,
  Register,
  Login,
  DashboardLayout,
} from "./pages";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
