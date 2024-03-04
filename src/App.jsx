import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//User Pages
import { MainNavigation } from "./shared/components";
import { Users } from "./user/pages";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" exact element={<Users />} />
          {/* <Route path="/places/new" exact element={<NewPlace />} /> */}
          {/* Redirect removed (optional, use Navigate if needed) */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
