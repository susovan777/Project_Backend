import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Update from "./components/Update";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students/create" element={<Create />} />
      <Route path="/students/edit/:id" element={<Update />} />
      <Route path="/students/profile/:id" element={<Profile />} />
    </Routes>
  );
};

export default App;
