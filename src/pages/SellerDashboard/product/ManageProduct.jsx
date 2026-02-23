import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";

export default function ManageProduct() {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axiosSecure.get("/products");
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch products", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the product permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/product/${id}`);
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        Swal.fire("Error", "Failed to delete product", "error");
      }
    }
  };

  // Approve product (admin)
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/product/${id}`, { status: "approved" });
      Swal.fire("Success", "Product approved!", "success");
      setProducts(
        products.map((p) => (p._id === id ? { ...p, status: "approved" } : p)),
      );
    } catch (err) {
      Swal.fire("Error", "Failed to approve product", "error");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading products...</p>;

  return (
    <div className=" min-h-screen bg-[#F9FAFB] w-full flex flex-col gap-6">
      <div className="flex justify-end">
        <button className="px-3 py-1.5 flex items-center bg-indigo-600  text-white rounded hover:bg-indigo-700 transition">
          <span className="mr-2">
            <Plus size={16} />
          </span>{" "}
          Add New Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-1.5 text-left">Image</th>
              <th className="px-4 py-1.5 text-left">Name</th>
              <th className="px-4 py-1.5 text-left">Price</th>
              <th className="px-4 py-1.5 text-left">Status</th>
              <th className="py-1.5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="px-4 py-2">
                  <img
                    src={product.image || "https://via.placeholder.com/60"}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : product.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {product.status === "pending" && (
                    <button
                      onClick={() => handleApprove(product._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                  {/* Optional Edit button */}
                  {/* <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Edit
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
