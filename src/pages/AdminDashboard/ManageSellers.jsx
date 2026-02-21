import React from "react";
import useAllSeller from "../../Hooks/Seller/useAllSeller";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";

const ManageSellers = () => {
  const [sellers, refetch] = useAllSeller();
  const axiosSecure = useAxiosSecure();
  //console.log(sellers);
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
    <div className="w-full mx-auto min-h-screen bg-[#F9FAFB]">
      <div className="w-full mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Head */}
            <thead className="bg-[#7C3AED] text-white text-lg">
              <tr>
                <th className="py-2 px-2 text-left">SL</th>
                <th className=" text-left">Image</th>
                <th className=" text-left">Name</th>
                <th className=" text-left">Email</th>
                <th className=" text-left">Phone</th>
                <th className=" text-left">Address</th>
                <th className=" text-left">Role</th>
                <th className=" text-center">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {sellers?.length > 0 ? (
                sellers.map((seller, index) => (
                  <tr
                    key={seller._id}
                    className="hover:bg-[#F3F4F6] transition-all border-b"
                  >
                    <td className=" px-2 font-semibold text-[#111827]">
                      {index + 1}
                    </td>

                    {/* Avatar */}
                    <td className="">
                      <div className="flex items-center gap-3">
                        <div className="mask mask-squircle h-12 w-12 overflow-hidden">
                          <img
                            src={seller?.photo}
                            alt={seller.name || "User Avatar"}
                            className="w-full h-full object-cover p-1"
                          />
                        </div>
                      </div>
                    </td>

                    {/* Name */}
                    <td className=" text-[#111827] font-medium">
                      {seller.name}
                    </td>

                    {/* Email */}
                    <td className=" text-gray-600">{seller.email}</td>

                    {/* Phone */}
                    <td className=" text-gray-600">{seller.phone}</td>

                    {/* Address */}
                    <td className=" text-gray-600">{seller.address}</td>

                    {/* Role */}
                    <td className="">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          seller.role === "seller"
                            ? "bg-[#C084FC] text-white" // Accent for seller
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {seller.role || "user"}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 flex justify-center items-center gap-2">
                      {seller.role !== "seller" && (
                        <button
                          onClick={() => handleMakeSeller(seller)}
                          className="btn btn-sm bg-[#7C3AED] border-none hover:bg-[#6D28D9] text-white transition"
                          title="Make Seller"
                        >
                          <FaUserShield />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteSeller(seller)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white transition"
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
                    colSpan="8"
                    className="text-center py-10 text-gray-500 text-lg"
                  >
                    No applicants found.
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
