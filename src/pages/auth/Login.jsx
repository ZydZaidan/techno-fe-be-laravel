import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Tambahkan useLocation
import API from "../../services/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook untuk membaca state redirect

  // Ambil path tujuan dari state (jika ada)
  const from = location.state?.redirectTo;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("authChange"));

        // Cek role user yang sedang login
        const userRole = user.role;
        const isAdminOrStaff = [
          "administrator",
          "admin",
          "verifikator",
          "reviewer",
        ].includes(userRole);

        // Jika tujuan awalnya adalah form user (inkubasi), tapi yang login malah Admin/Staff:
        if (from && from.includes("/user") && isAdminOrStaff) {
          alert(
            "Login berhasil! Namun akun Admin/Staff tidak dapat mengakses form pengajuan tenant. Anda dialihkan ke Dashboard Admin.",
          );

          // Redirect paksa ke dashboard sesuai rolenya masing-masing
          if (userRole === "admin" || userRole === "administrator") {
            navigate("/admin/dashboard");
          } else if (userRole === "verifikator") {
            navigate("/verifikator/dashboard");
          } else if (userRole === "reviewer") {
            navigate("/reviewer/dashboard");
          }
          return;
        }

        // Jika aman (role user/tenant mengakses form user, atau admin login normal)
        if (from) {
          navigate(from);
        } else {
          // Default redirect berdasarkan role jika tidak ada 'from'
          if (isAdminOrStaff) {
            if (userRole === "admin" || userRole === "administrator")
              navigate("/admin/dashboard");
            else if (userRole === "verifikator")
              navigate("/verifikator/dashboard");
            else if (userRole === "reviewer") 
              navigate("/reviewer/dashboard");
          } else {
            navigate("/"); // Atau ke /user/dashboard untuk user biasa
          }
        }
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Gagal masuk. Periksa koneksi backend!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex font-poppins bg-white">
      {/* BRANDING / BANNER */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0d3b66] justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-[#004e92] via-[#000428]/80 to-[#004e92]/90 z-10 opacity-90" />
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"
          alt="Technopark IT-PLN"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-12">
          <h1 className="font-readex text-5xl font-extrabold tracking-tight mb-4">
            TECHNOPARK
          </h1>
          <p className="text-cyan-200 text-lg font-light tracking-wide">
            Gateway to Innovation and Collaboration
          </p>
        </div>
      </div>

      {/* FORM LOGIN */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <h2 className="font-readex text-3xl font-extrabold text-[#1c3250]">
              Selamat Datang
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Silakan masuk ke akun Anda
            </p>
          </div>

          {/* Alert Error jika login gagal */}
          {errorMsg && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-xl">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#fde047] hover:bg-[#facc15] text-[#1c3250] font-bold rounded-xl transition-all shadow-sm duration-200 disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Login ke Dashboard"}
            </button>
          </form>

          <div className="text-center text-sm text-slate-500 pt-4">
            Belum punya akun tenant?{" "}
            <Link
              to="/register"
              className="font-bold text-custom-cyan hover:underline"
            >
              Daftar di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
