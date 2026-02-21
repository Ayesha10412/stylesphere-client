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
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full mx-auto min-h-screen bg-gray-50">
      <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="table w-full ">
            {/* Head */}
            <thead className="bg-[#7C3AED] text-white text-sm">
              <tr className="">
                <th className="py-2 px-2 text-left">SL</th>
                <th className=" text-left">Image</th>
                <th className=" text-left">Name</th>
                <th className=" text-left">Email</th>
                <th className=" text-left">Role</th>
                <th className=" text-center">Action</th>
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
                    <td className="font-semibold text-gray-700 px-2">{index + 1}</td>

                    {/* User Info */}
                    <td className=" ">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12 overflow-hidden">
                            <img
                              src={user?.photo}
                              alt={user.name || "User Avatar"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* name */}
                    <td className=" text-gray-600">{user.name}</td>

                    {/* Email */}
                    <td className=" text-gray-600">{user.email}</td>

                    {/* Role */}
                    <td className="">
                      <span
                        className={`px-1.5 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-[#C084FC] text-white" // Accent color for admin
                            : "bg-[#F3F4F6] text-[#111827]" // Subtle gray for users
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className=" mt-4  flex justify-center items-end text-lg gap-3">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-sm bg-[#7C3AED] border-none hover:bg-[#6D28D9] text-white transition"
                          title="Make Admin"
                        >
                          <FaUserShield />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white transition"
                        title="Delete User"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="hover:bg-[#F9FAFB] transition-all border-b">
                  {" "}
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
