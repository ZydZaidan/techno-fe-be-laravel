import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    nimNidn: "",
    noHp: "",
    jurusan: "",
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

    if (formData.role === "user" && !formData.jurusan) {
      setErrorMsg("Silakan pilih jurusan Anda!");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/auth/register", {
        nama: formData.fullName,
        email: formData.email,
        nim_nidn: formData.nimNidn || null,
        no_hp: formData.noHp || null,
        jurusan: formData.role === "user" ? formData.jurusan : null,
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
            </select>
          </div>

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

          {/* Input NIM / NIDN */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              NIM / NIDN
            </label>
            <input
              type="text"
              name="nimNidn"
              placeholder="Masukkan NIM atau NIDN"
              value={formData.nimNidn}
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

          {/* Input No HP / WhatsApp */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              No. WhatsApp / HP
            </label>
            <input
              type="tel"
              name="noHp"
              required
              placeholder="08xxxxxxxxxx"
              value={formData.noHp}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
            />
          </div>

          {/* Dropdown Jurusan - Hanya Muncul untuk Role 'user' */}
          {formData.role === "user" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Jurusan / Program Studi
              </label>
              <select
                name="jurusan"
                required
                value={formData.jurusan}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
              >
                <option value="">-- Pilih Jurusan --</option>
                <optgroup label="Fakultas Ketenagalistrikan dan Energi Terbarukan (FKET)">
                  <option value="S1 Teknik Elektro">S1 Teknik Elektro</option>
                  <option value="S1 Teknik Tenaga Listrik">S1 Teknik Tenaga Listrik</option>
                  <option value="S1 Teknik Sistem Energi">S1 Teknik Sistem Energi</option>
                  <option value="D3 Teknologi Listrik">D3 Teknologi Listrik</option>
                </optgroup>

                <optgroup label="Fakultas Telematika Energi (FTE)">
                  <option value="S1 Teknik Informatika">S1 Teknik Informatika</option>
                  <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                  <option value="S1 Sains Data">S1 Sains Data</option>
                </optgroup>

                <optgroup label="Fakultas Teknologi dan Bisnis Energi (FTBE)">
                  <option value="S1 Teknik Mesin">S1 Teknik Mesin</option>
                  <option value="S1 Teknik Sipil">S1 Teknik Sipil</option>
                  <option value="S1 Teknik Industri">S1 Teknik Industri</option>
                  <option value="S1 Kewirausahaan / Bisnis Energi">S1 Kewirausahaan / Bisnis Energi</option>
                  <option value="D3 Teknik Mesin">D3 Teknik Mesin</option>
                </optgroup>

                <optgroup label="Fakultas Teknologi Infrastruktur dan Kewilayahan (FTIK)">
                  <option value="S1 Geografi">S1 Geografi</option>
                  <option value="S1 Teknik Lingkungan">S1 Teknik Lingkungan</option>
                  <option value="D4 Teknik Rekayasa Pengelolaan & Pemeliharaan Bangunan Sipil">
                    D4 Teknik Rekayasa Pengelolaan & Pemeliharaan Bangunan Sipil
                  </option>
                </optgroup>

                <optgroup label="Lainnya">
                  <option value="Umum / Luar Kampus">Umum / Luar Kampus</option>
                </optgroup>
              </select>
            </div>
          )}

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