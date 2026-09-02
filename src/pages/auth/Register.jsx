import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default Role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    // 🛠️ MOCK REGISTER: Simpan user baru ke LocalStorage
    const mockUser = {
      name: formData.fullName,
      email: formData.email,
      role: formData.role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.fullName)}`,
    };

    localStorage.setItem("token", "mock-jwt-token-67890");
    localStorage.setItem("user", JSON.stringify(mockUser));

    // Redirect langsung ke Homepage
    navigate("/");
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

          {/* Select Role Testing */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Daftar Sebagai (Testing Role)
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
            >
              <option value="user">User (Dosen / Mahasiswa / Tenant)</option>
              <option value="verifikator">Verifikator</option>
              <option value="reviewer">Reviewer / Mentor</option>
              <option value="admin">Admin</option>
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
            className="w-full py-3 bg-[#1c3250] hover:bg-custom-blue text-white font-bold rounded-xl transition-all shadow-sm duration-200 mt-2"
          >
            Daftar Akun
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