export const getStatusColor = (
  status: string | boolean | undefined,
) => {
  if (typeof status === "boolean") {
    return status
      ? "bg-green-100 text-green-600"
      : "bg-yellow-100 text-yellow-600";
  }

  switch (status) {
    case "approved":
      return "bg-green-100 text-green-600";

    case "rejected":
      return "bg-red-100 text-red-600";

    case "pending":
      return "bg-yellow-100 text-yellow-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
};