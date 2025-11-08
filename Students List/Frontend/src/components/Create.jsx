import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";

const Create = () => {
  const [form, setForm] = useState({
    fName: "",
    lName: "",
    email: "",
    gpa: "",
    major: "Arts",
    year: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  const url = "http://localhost:3000/api/v1/students";

  function generateRandomID() {
    // --- 1. Alphabet Part (3 Chars) ---

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let letterPart = "";

    for (let i = 0; i < 3; i++) {
      // Get a random index from 0 to 25
      const randomIndex = Math.floor(Math.random() * letters.length);
      // Add the character at that index
      letterPart += letters.charAt(randomIndex);
    }

    // --- 2. Digit Part (4 Chars) ---

    // Generate a random integer from 0 to 9999
    const numberPart = Math.floor(Math.random() * 10000);

    // Convert to string and pad with leading '0's to make it 4 digits
    const digitPart = String(numberPart).padStart(4, "0");

    // --- 3. Combine ---

    return letterPart + digitPart;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    const record = {
      studentId: generateRandomID(),
      firstName: form.fName,
      lastName: form.lName,
      email: form.email,
      major: form.major,
      gpa: form.gpa,
      enrollmentYear: form.year,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    })
      .then((response) => {
        response.json()
      })
      .catch((err) => console.error("Error:", err));

    // after save navigate to the hope page
    navigate("/");
    console.log(record);
  };

  return (
    <div className="p-6">
      <Navbar />
      <h3 className="text-lg font-semibold p-4">Create Employee Record</h3>
      <div className="flex items-center justify-center">
        <form
          className="border border-slate-400 rounded-lg overflow-hidden p-4"
          onSubmit={submitForm}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="fName"
                value={form.fName}
                onChange={handleChange}
                placeholder="Jane"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                name="lName"
                value={form.lName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
              />
              <p className="text-gray-600 text-xs italic">
                Enter a valid email address
              </p>
            </div>
          </div>
          <div className="flex flex-wrap border-b border-slate-900/10 pb-12 -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-gpa">
                GPA
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-gpa"
                type="text"
                name="gpa"
                value={form.gpa}
                onChange={handleChange}
                placeholder="5.7"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-major">
                Major <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-major"
                  value={form.major}
                  name="major"
                  onChange={handleChange}
                  required>
                  <option>Computer Science</option>
                  <option>Electrical Engineering</option>
                  <option>Business</option>
                  <option>Arts</option>
                  <option>Mathematics</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-year">
                Enrollment Year <span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-year"
                type="text"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2000"
                required
              />
            </div>
          </div>

          <input
            type="submit"
            value="Save Employee Record"
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background border-slate-900/10 hover:bg-green-400 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default Create;
