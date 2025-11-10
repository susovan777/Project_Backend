// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import RecordList from "./RecordList";

const Home = () => {
  const notify = () => toast("Wow! so easy!");

  return (
    <div className="w-full p-6">
      <Navbar />
      <button onClick={notify}>Notify!</button>
      <Toaster />
      <RecordList />
    </div>
  );
};

export default Home;
