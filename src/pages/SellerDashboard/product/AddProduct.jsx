import React, { useState } from "react";
import Swal from "sweetalert2";
import Input from "./Input"; // your custom Input component

export default function AddProduct({ isOpen, onClose, onProductAdded, axiosSecure }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosSecure.post("/products", formData);
      Swal.fire("Success", res.data.message, "success");
      onProductAdded(res.data.result.insertedId); // notify parent to refresh
      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
          <Input
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
          />
          <Input
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}