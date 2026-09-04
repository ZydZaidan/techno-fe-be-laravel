import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api"; // Impor instance Axios kamu

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default Role
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    setLoading(true);

    try {
      // Tembak API Backend Register Real
      const response = await API.post("/auth/register", {
        nama: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (response.data.success) {
        alert("Registrasi berhasil! Silakan login dengan akun Anda.");
        navigate("/login");
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Registrasi gagal. Periksa koneksi backend!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-poppins bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        {/* Header Form */}
        <div className="text-center">
          <h2 className="font-readex text-3xl font-extrabold text-[#1c3250]">
            Buat Akun Baru
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Bergabunglah dengan Ekosistem Technopark
          </p>
        </div>

        {/* Alert Error jika register gagal */}
        {errorMsg && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-xl">
            {errorMsg}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Nama Lengkap */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Masukkan nama lengkap"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
            />
          </div>

          {/* Input Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Kampus / Umum
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
            />
          </div>

          {/* Select Role */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Daftar Sebagai
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
            >
              <option value="user">User / Tenant Pengusul</option>
              <option value="verifikator">Verifikator</option>
              <option value="reviewer">Reviewer / Mentor</option>
              <option value="administrator">Administrator</option>
            </select>
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Minimal 8 karakter"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
            />
          </div>

          {/* Input Konfirmasi Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Ulangi password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1c3250] hover:bg-custom-blue text-white font-bold rounded-xl transition-all shadow-sm duration-200 mt-2 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Daftar Akun"}
          </button>
        </form>

        {/* Footer Link Login */}
        <div className="text-center text-sm text-slate-500 pt-2">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-bold text-custom-cyan hover:underline">
            Login di sini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;