import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBook = () => {
  const url = `http://localhost:3000/api/v1/books`;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishedYear: year,
      price,
    };

    setLoading(true);
    axios
      .post(url, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        {
          setLoading(false);
          alert("An error happend");
          console.log(err.response.data.messege);
        }
      });
  };

  return (
    <div className="mt-4 ml-4">
      <BackButton />
      <br />
      <h1 className="text-3xl my-4">Create Book</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="mr-4 text-gray-500">Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-1 rounded-md border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="mr-4 text-gray-500">Author</label>

            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-1 rounded-md border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="mr-4 text-gray-500">Published Year</label>

            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border-1 rounded-md border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="mr-4 text-gray-500">Price</label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-1 rounded-md border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBook;
