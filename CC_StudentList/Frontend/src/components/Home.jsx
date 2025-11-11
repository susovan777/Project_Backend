// import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import RecordList from "./RecordList";

const Home = () => {
  return (
    <div className="w-full p-6">
      <Navbar />
      <Toaster />
      <RecordList />
    </div>
  );
};

export default Home;
