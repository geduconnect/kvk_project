import { useEffect, useState } from "react";
import { getProfile } from "../api";

export default function AdminAccount() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(); // Calls /api/auth/profile with adminToken
        setAdmin(res.data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
        alert(err.response?.data?.msg || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  if (loading) return <p>Loading profile...</p>;
  if (!admin) return <p>Admin not found</p>;

  return (
    <div>
      <h1>My Account</h1>
      <div>
        <p><strong>Name:</strong> {admin.name}</p>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>Role:</strong> {admin.role}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
