import { useEffect, useState } from "react";
import config from "../config";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const Profile = () => {
  const url = `${config.backend_URL}/api/v1/students`;
  const { id } = useParams();

  const [record, setRecord] = useState({});

  useEffect(() => {
    const getData = async () => {
      await fetch(`${url}/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRecord(data.data);
        })
        .catch((err) => console.error(err));
    };

    getData();
  }, []);

  return (
    <div className="w-full p-6">
      <Navbar />

      <div className="flex justify-center items-center m-10">
        <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
          <div className="flex justify-end px-4 pt-4">
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown"
              className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button">
              <span className="sr-only">Open dropdown</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </button>

            <div
              id="dropdown"
              className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Export Data
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative mx-auto w-36 rounded-full">
            <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
            <img
              className="mx-auto h-auto w-full rounded-full"
              src="https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
            {record.firstName} {record.lastName}
          </h1>
          <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
            Harvard University
          </h3>
          <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Architecto, placeat!
          </p>
          <ul className="mt-3 divide-y divide-gray-200 rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
            <li className="flex items-center py-3 text-sm">
              <span>Student ID</span>
              <span className="ml-auto">
                <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                  {record.studentId}
                </span>
              </span>
            </li>
            <li className="flex items-center py-3 text-sm">
              <span>Email</span>
              <span className="ml-auto">
                {record.email}
              </span>
            </li>
            <li className="flex items-center py-3 text-sm">
              <span>Major Subject</span>
              <span className="ml-auto">{record.major}</span>
            </li>
            <li className="flex items-center py-3 text-sm">
              <span>GPA</span>
              <span className="ml-auto">{record.gpa}</span>
            </li>
            <li className="flex items-center py-3 text-sm">
              <span>Enrollment Year</span>
              <span className="ml-auto">{record.enrollmentYear}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
