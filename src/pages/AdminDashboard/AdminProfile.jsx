import  { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAllUsers from "../../Hooks/Users/useAllUsers";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const { user: authUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [users, refetch] = useAllUsers();

  const [isEditing, setIsEditing] = useState(false);

  const user =
    users.find((u) => u.email === authUser?.email) || {};

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
  });

  useEffect(() => {
    if (user?._id) {
      setFormData({
        name: user?.name || "",
        photo: user?.photo || "",
      });
    }
  }, [user?._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    if (!user?._id) return;

    const updateField = {
      name: formData.name,
      photo: formData.photo,
    };

    try {
      const res = await axiosSecure.patch(
        `/user/${user._id}`,
        updateField
      );

      if (res.data?.modifiedCount > 0) {
        Swal.fire(
          "Success",
          "Profile Updated Successfully!",
          "success"
        );
        setIsEditing(false);
        refetch();
      } else {
        Swal.fire(
          "Info",
          "No changes detected!",
          "info"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to update profile",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]  w-full">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-8">

          {/* Avatar */}
          <div className="relative">
            <img
              src={user?.photo}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-[#C084FC]"
            />
            <span className="absolute bottom-2 right-2 bg-[#7C3AED] text-white text-xs px-3 py-1 rounded-full">
              {user?.role}
            </span>
          </div>

          {/* Basic Info */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-[#111827]">
              {user?.name}
            </h2>
            <p className="text-[#6B7280] mt-1">
              {user?.email}
            </p>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-5 px-6 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg transition"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Info Section */}
        {!isEditing && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>
              <p className="text-sm text-[#6B7280]">
                Full Name
              </p>
              <p className="text-lg font-medium text-[#111827]">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6B7280]">
                Email Address
              </p>
              <p className="text-lg font-medium text-[#111827]">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6B7280]">
                Role
              </p>
              <p className="text-lg font-semibold text-[#7C3AED]">
                {user?.role}
              </p>
            </div>

          </div>
        )}

        {/* Edit Section */}
        {isEditing && (
          <div className="mt-8 space-y-6">

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2 rounded-lg border border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateProfile}
                className="px-5 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white transition"
              >
                Save Changes
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminProfile;