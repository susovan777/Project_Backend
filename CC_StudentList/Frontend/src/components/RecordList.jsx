import config from "../config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Record = () => {};

const RecordList = () => {
  // const url = `http://localhost:3000/api/v1/students`;
  const url = `${config.backend_URL}/api/v1/students`;
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(url);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        console.error(message);
        return;
      }

      const record = await response.json();
      setRecords(record.data);
    }

    getRecords();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    toast("User deleted successfully", {
      icon: "⚠️",
    });
    const newRecords = records.filter((el) => el._id != id);
    setRecords(newRecords);
  };

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Student Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  First Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Last Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Major
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {records.map((item) => {
                return (
                  <tr
                    key={item._id}
                    className="border-b border-slate-400 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      {item.firstName}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      {item.lastName}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      {item.major}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      {item.email}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <div className="flex gap-2">
                        <Link
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-400 border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                          to={`/students/edit/${item._id}`}>
                          Edit
                        </Link>
                        <button
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50 border border-slate-400 border-input bg-background hover:bg-red-100 hover:text-accent-foreground h-9 rounded-md px-3"
                          color="red"
                          type="button"
                          onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                        <Link
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-400 border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                          to={`/students/profile/${item._id}`}>
                          👤 Profile
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecordList;
