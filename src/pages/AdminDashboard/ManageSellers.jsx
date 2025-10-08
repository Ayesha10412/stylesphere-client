import React from "react";
import useAllSeller from "../../Hooks/Seller/useAllSeller";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";

const ManageSellers = () => {
  const [sellers, refetch] = useAllSeller();
  const axiosSecure = useAxiosSecure();
  console.log(sellers);
  const handleMakeSeller = async (seller) => {
    Swal.fire({
      title: "Do you want to accept as a seller!?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/seller/${seller?._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            {
              refetch();
              Swal.fire("Saved!", "", "success");
            }
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const handleDeleteSeller = async (seller) => {
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
        axiosSecure.delete(`/seller/${seller._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Application has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold text-sky-600 text-center mb-5">
        Manage Sellers
      </h1>
      <div className="w-[90%] lg:w-[80%] mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        <h2 className="text-xl text-red-500 font-semibold text-right mt-1 mb-3">
          Total Applicants: {sellers?.length}
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
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Role</th>

                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {sellers?.length > 0 ? (
                sellers.map((seller, index) => (
                  <tr
                    key={seller._id}
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
                              src={seller?.photo}
                              alt={seller.name || "User Avatar"}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* name */}
                    <td className="py-3 px-4 text-gray-600">{seller.name}</td>

                    {/* Email */}
                    <td className="py-3 px-4 text-gray-600">{seller.email}</td>
                    {/* phone */}
                    <td className="py-3 px-4 text-gray-600">{seller.phone}</td>

                    {/* Address */}
                    <td className="py-3 px-4 text-gray-600">
                      {seller.address}
                    </td>
                    {/* Role */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          seller.role === "seller"
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {seller.role || "user"}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 flex justify-center items-end   text-lg gap-3">
                      {seller.role !== "seller" && (
                        <button
                          onClick={() => handleMakeSeller(seller)}
                          className="btn btn-sm bg-green-600 border-2 border-gray-400 rounded-lg hover:bg-green-700 text-white"
                          title="Make Seller"
                        >
                          <FaUserShield />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteSeller(seller)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                        title="Delete Applicant"
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
                    No applicant found.
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

export default ManageSellers;
