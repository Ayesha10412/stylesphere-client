import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAllUsers from "../../Hooks/Users/useAllUsers";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const { user: authUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: authUser?.name || "",
    photo: authUser?.photo || "",
  });
  const axiosSecure = useAxiosSecure();
  const [users, refetch] = useAllUsers();
  const user = users.find((u) => u.email === authUser.email) || {};
  useEffect(() => {
    setFormData({
      name: user?.name || authUser?.name || "",
      photo: user?.photo || authUser?.photo || "",
    });
  }, [user?._id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleUpdateProfile = async () => {
    if (!user?._id) {
      return;
    }
    const updateField = {
      name: formData.name !== user.name ? formData.name : user.name,
      photo: formData.photo !== user.photo ? formData.photo : user.photo,
    };

    try {
      const res = await axiosSecure.patch(`/user/${user._id}`, updateField);
      if (res.data?.modifiedCount > 0 && res.data.updatedUser) {
        Swal.fire("Success", "Profile Updated Successfully!", "Success");
        setShowModal(false);
        refetch();
      } else {
        Swal.fire("Info", "No changes detected!", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to updated profile", "error");
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="text-4xl text-teal-600 font-bold mt-8 mb-6 text-center ">
          Hi, Welcome <span className="text-indigo-400">{user?.name}</span>
        </h1>
        <div className="card bg-base-100 w-full max-w-lg my-5 shrink-0 shadow-2xl ">
          <form className="card-body">
            <div className="form-control">
              <div className="w-32 h-32  mx-auto">
                <img
                  className="w-full border-2 border-green-600 rounded-full"
                  src={user?.photo}
                  alt=""
                />
              </div>
            </div>
            <div className="form-control">
              <p className="text-center mt-2">
                <span className="text-2xl text-black font-bold">Name: </span>
                <span className="text-green-700 font-semibold text-2xl">
                  {user?.name}
                </span>
              </p>
            </div>
            <div className="form-control">
              <p className="text-center mt-2">
                <span className="text-2xl text-black font-bold">Email: </span>
                <span className="text-gray-700 font-semibold text-xl">
                  {user?.email}
                </span>
              </p>
            </div>
            <div className="form-control">
              <p className="text-center mt-2">
                <span className="text-2xl text-black font-bold">Role: </span>
                <span className="text-red-700 font-bold text-2xl">
                  {user?.role}
                </span>
              </p>
            </div>
            <div className="form-control mt-6 flex justify-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
                className="btn bg-emerald-700 mb-5 btn-primary py-1.5 rounded-lg px-1.5 text-white"
              >
                Update Information
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30 z-50">
          <div className="bg-white w-11/12 max-w-md rounded-2xl shadow-lg p-6 relative">
            <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Edit Your Profile
            </h3>{" "}
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </form>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
