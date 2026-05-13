export const getStatusLabel = (
  status: string | boolean | undefined,
) => {
  if (typeof status === "boolean") {
    return status ? "Approved" : "Pending";
  }

  switch (status) {
    case "approved":
      return "Approved";

    case "rejected":
      return "Rejected";

    case "pending":
      return "Pending";

    default:
      return "Unknown";
  }
};