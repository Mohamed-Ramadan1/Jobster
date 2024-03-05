// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//User Pages
import { MainNavigation } from "./shared/components";
import { Users } from "./user/pages";

//Places import
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" exact element={<Users />} />
          <Route path="/places/new" exact element={<NewPlace />} />
          <Route path="/:userId/places" exact element={<UserPlaces />} />
          {/* <Route path="/places/new" exact element={<NewPlace />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
