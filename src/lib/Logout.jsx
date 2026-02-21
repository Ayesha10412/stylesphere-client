import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import toast from "react-hot-toast";
import Button from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export const Logout = ({ classname = "" }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout()
      .then(() => {
        toast.success("Logout successfully!!");
        navigate("/login");
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
