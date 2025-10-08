import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const SellerSignUp = () => {
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const application = {
        name: data.name,
        email: data.email,
        photo: data.photo,
        address: data.address,
        phone: data.phone,
      };
      const res = await axiosPublic.post("/sellers", application);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application has been sent for review!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  //StitchLuxe
  return (
    <div className="w-full mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Register as a Seller!
      </h1>

      <div className="w-[35%] mx-auto border-2 border-gray-100 rounded-lg px-12 py-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-6 mx-auto"
        >
          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="input input-bordered w-full py-1.5 px-1"
          />
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="input input-bordered w-full py-1.5 px-1"
          />
          {errors.email && <span>Email is required</span>}
          <input
            {...register("photo", { required: true })}
            placeholder="Photo URL"
            className="input input-bordered w-full py-1.5 px-1"
          />
          <input
            {...register("phone", { required: true })}
            placeholder="Phone number"
            className="input input-bordered w-full py-1.5 px-1"
          />
          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className="input input-bordered w-full py-1.5 px-1"
          />
          <button
            type="submit"
            className="btn btn-primary w-full rounded-lg text-white py-1.5 font-bold mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerSignUp;
