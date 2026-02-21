import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import toast from "react-hot-toast";
import Button from "../components/ui/button";

export const Logout = ({ classname = "" }) => {
  const { LogOut } = useContext(AuthContext);
  const handleLogOut = () => {
    LogOut()
      .then(() => {
        toast.success("LogOut successfully!!");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <Button variant="menu" size="md" fullWidth onClick={handleLogOut}>
      Logout
    </Button>
  );
};
