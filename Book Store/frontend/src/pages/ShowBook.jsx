import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const { id } = useParams();
  const url_ = `http://localhost:3000/api/v1/books/${id}`;

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url_)
      .then((res) => {
        setBook(res.data.data.book);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(book);

  return (
    <div className="p-4">
      <BackButton />
      <h1>Show Book</h1>
      <br />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishedYear}</span>
          </div>
          <div className="my-4">
            <span className="mr-4 text-gray-500">Created</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
