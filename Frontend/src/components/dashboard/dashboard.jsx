import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../Headers/DashboardHeader";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/user", {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        if (!data.logged_in) {
          navigate("/");
        }
      });
  }, [navigate]);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <DashboardHeader />
      <div>Dashboard</div>
      <button
        onClick={logout}
        className="bg-gray-500 text-white py-2 px-4 rounded-lg cursor-pointer"
      >
        logout
      </button>
    </>
  );
}
