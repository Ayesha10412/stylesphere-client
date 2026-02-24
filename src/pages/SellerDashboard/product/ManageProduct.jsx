import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/Input";

export default function ManageProduct() {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    status: "pending",
  });
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
  /////handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category);
    formData.append("image", newProduct.image); // file
    try {
      await axiosSecure.post("/products", formData, {
        "content-type": "multipart/form-data",
      });
      Swal.fire("Success", "Product added successfully", "success");
      setIsModalOpen(false);
      setNewProduct({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
        status: "pending",
      });
    } catch (error) {
      Swal.fire("Error", "Failed to add product", "error");
    }
  };
  if (loading) return <p className="text-center mt-8">Loading products...</p>;

  return (
    <div className=" min-h-screen bg-[#F9FAFB] w-full flex flex-col gap-6">
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="sm"
          className=" flex items-center bg-indigo-600  text-white  hover:bg-indigo-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} className="mr-1" />
          Add New Product
        </Button>
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-indigo-800 mb-6 text-center">
              Add New Product
            </h2>

            <form
              onSubmit={handleAddProduct}
              className="space-y-2  grid grid-cols-2 gap-4"
            >
              <Input
                label="Product Name"
                name="name"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Price"
                type="number"
                name="price"
                placeholder="Enter price"
                value={newProduct.price}
                onChange={handleChange}
                required
              />

              <Input
                label="Upload Image"
                type="file"
                name="image"
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }))
                }
              />

              <Input
                label="Category"
                name="category"
                placeholder="Enter category"
                value={newProduct.category}
                onChange={handleChange}
              />

              {/* Description textarea (since Input is only input) */}
              <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="Enter product description"
                />
              </div>

              <div className="col-span-2 flex justify-end gap-2 pt-4 ">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-sm text-red-600 bg-red-100 text-sm hover:bg-red-500 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
