import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Update from "./components/Update";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students/create" element={<Create />} />
      <Route path="/students/update/:id" element={<Update />} />
    </Routes>
  );
};

export default App;
