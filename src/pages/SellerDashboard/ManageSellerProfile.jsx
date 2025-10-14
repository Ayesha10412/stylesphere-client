import { useEffect, useState } from "react";
import useSellerEmail from "../../Hooks/Seller/useSellerEmail";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageSellerProfile = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [seller, refetch] = useSellerEmail();
  console.log(seller);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    if (seller) {
      setFormData({
        name: seller.name || "",
        photo: seller.photo || "",
        phone: seller.phone || "",
        address: seller.address || "",
      });
    }
  }, [seller]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const updateField = {
    name: formData.name !== seller.name ? formData.name : seller.name,
    photo: formData.photo !== seller.photo ? formData.photo : seller.photo,
    phone: formData.phone !== seller.phone ? formData.phone : seller.phone,
    address:
      formData.address !== seller.address ? formData.address : seller.address,
  };
  const handleUpdateProfile = async (seller) => {
    const res = await axiosSecure.patch(
      `/seller/profile/${seller._id}`,
      updateField
    );
    if (res.data.modifiedCount > 0 && res.data.updatedSeller) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  return (
    <div className="mt-14 flex flex-col gap-8 items-center">
      <h1 className="text-center font-bold text-3xl text-amber-500">
        Hi, Welcome <span className=" text-amber-700">{seller.name}</span>
      </h1>
      <div className="card bg-base-100 w-full  max-w-lg my-5 shrink-0 shadow-2xl ">
        <form className="card-body">
          <div className="form-control ">
            <div className="w-32 h-32  mx-auto">
              <img
                className="w-full border-2 border-green-600 rounded-full"
                src={seller?.photo}
                alt=""
              />
            </div>
          </div>
          <div className="form-control">
            <p className="text-center mt-2">
              <span className="text-2xl text-black font-bold">Name: </span>
              <span className="text-green-700 font-semibold text-2xl">
                {seller?.name}
              </span>
            </p>
          </div>
          <div className="form-control">
            <p className="text-center mt-2">
              <span className="text-2xl text-black font-bold">Email: </span>
              <span className="text-gray-700 font-semibold text-xl">
                {seller?.email}
              </span>
            </p>
          </div>
          <div className="form-control">
            <p className="text-center mt-2">
              <span className="text-2xl text-black font-bold">Role: </span>
              <span className="text-red-700 font-bold text-2xl">
                {seller?.role}
              </span>
            </p>
          </div>
          <div className="form-control">
            <p className="text-center mt-2">
              <span className="text-2xl text-black font-bold">Phone: </span>
              <span className="text-gray-700 font-semibold text-xl">
                {seller?.phone}
              </span>
            </p>
          </div>
          <div className="form-control">
            <p className="text-center mt-2">
              <span className="text-2xl text-black font-bold">Address: </span>
              <span className="text-gray-700 font-semibold text-xl">
                {seller?.address}
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
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
                onClick={() => handleUpdateProfile(seller)}
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
export default ManageSellerProfile;
