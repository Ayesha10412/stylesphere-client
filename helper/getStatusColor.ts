export const getStatusColor = (status: string | boolean | undefined) => {
  if (typeof status === "boolean") {
    return status
      ? "bg-yellow-100 text-yellow-600"
      : "bg-green-100 text-green-600";
  }

  switch (status?.toLowerCase()) {
    case "approved":
    case "completed":
    case "paid":
      return "bg-green-100 text-green-600";

    case "rejected":
    case "failed":
    case "cancelled":
      return "bg-red-100 text-red-600";

    case "pending":
      return "bg-yellow-100 text-yellow-600";

    case "processing":
      return "bg-blue-100 text-blue-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
};
