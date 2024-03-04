import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <h1>You in the base router</h1>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
