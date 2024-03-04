import { createBrowserRouter, RouterProvider } from "react-router-dom";

//User Pages
import { Users } from "./user/pages";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Users />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
