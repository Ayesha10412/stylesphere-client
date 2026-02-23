import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUserEmail from "../../Hooks/useUserEmail";
import defaultAvatar from "../../assets/avatar.png";
import Input from "../../components/ui/Input";
const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const [user, loading,refetch] = useUserEmail();
  const [isEditing, setIsEditing] = useState(false);
//   console.log("User data:", user);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user?._id) {
      setFormData({
        name: user.name || "",
        photo: user.photo || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axiosSecure.patch(`/user/${user._id}`, formData);

      if (res.data?.modifiedCount > 0) {
        Swal.fire("Success", "Profile Updated!", "success");
        setIsEditing(false);
        refetch()
      } else {
        Swal.fire("Info", "No changes detected!", "info");
      }
    } catch (err) {
      Swal.fire("Error", "Update Failed", "error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className=" mx-auto bg-white p-6 rounded-xl shadow-lg grid grid-cols-2 gap-6">
 
      <div className="flex items-center gap-6 ">
        <div className="relative">
          <img
            src={user?.photo || defaultAvatar}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover shadow-md"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user?.name}</h2>

          <p className="text-gray-500 mt-1">{user?.email}</p>

          <span className="inline-block mt-3 text-xs bg-indigo-600 text-white px-3 py-1 rounded-full uppercase tracking-wide">
            {user?.role}
          </span>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
    
        <div className="flex-1">
          {!isEditing && (
            <div className="space-y-4">
              <p>
                <strong>Phone:</strong> {user?.phone}
              </p>
              <p>
                <strong>Address:</strong> {user?.address}
              </p>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Edit Profile
              </button>
            </div>
          )}

          {isEditing && (
            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />

              <Input
                label="Profile Photo URL"
                name="photo"
                value={formData.photo}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />

              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />

              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
              />

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdateProfile}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
