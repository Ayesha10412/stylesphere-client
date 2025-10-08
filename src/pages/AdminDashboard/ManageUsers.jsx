import React from "react";
import useAllUsers from "../../Hooks/Users/useAllUsers";
import { FaUserShield, FaTrashAlt, FaUser } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, refetch] = useAllUsers();
  //console.log(users);

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user?._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user?.name} is admin now!!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="mt-20 w-full mx-auto min-h-screen bg-gray-50">
      <h1 className="text-center font-bold text-4xl text-green-600 mb-10">
        All Users
      </h1>

      <div className="w-[90%] lg:w-[80%] mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        <h2 className="text-xl text-red-500 font-semibold text-right mt-1 mb-3">
          Total User: {users?.length}
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Head */}
            <thead className="bg-green-500 text-white text-lg">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {users?.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-green-50 transition-all border-b"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-700">
                      {index + 1}
                    </td>

                    {/* User Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user?.photo}
                              alt={user.name || "User Avatar"}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* name */}
                    <td className="py-3 px-4 text-gray-600">{user.name}</td>

                    {/* Email */}
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>

                    {/* Role */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 flex justify-center items-end   text-lg gap-3">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-sm bg-green-600 border-2 border-gray-400 rounded-lg hover:bg-green-700 text-white"
                          title="Make Admin"
                        >
                          <FaUserShield />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                        title="Delete User"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500 text-lg"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
