import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../../services/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.redirectTo;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));

        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("authChange"));

        const userRole = user.role;
        const isAdminOrStaff = [
          "administrator",
          "admin",
          "verifikator",
          "reviewer",
        ].includes(userRole);

        if (from && from.includes("/user") && isAdminOrStaff) {
          alert(
            "Login berhasil! Namun akun Admin/Staff tidak dapat mengakses form pengajuan tenant. Anda dialihkan ke Dashboard Admin."
          );

          if (userRole === "admin" || userRole === "administrator") {
            navigate("/admin/dashboard");
          } else if (userRole === "verifikator") {
            navigate("/verifikator/dashboard");
          } else if (userRole === "reviewer") {
            navigate("/reviewer/dashboard");
          }
          return;
        }

        if (from) {
          navigate(from);
        } else {
          if (isAdminOrStaff) {
            if (userRole === "admin" || userRole === "administrator")
              navigate("/admin/dashboard");
            else if (userRole === "verifikator")
              navigate("/verifikator/dashboard");
            else if (userRole === "reviewer")
              navigate("/reviewer/dashboard");
          } else {
            navigate("/");
          }
        }
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Gagal masuk. Periksa koneksi backend!"
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
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 md:p-16 relative">
        {/* BUTTON KEMBALI */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 text-slate-500 hover:text-[#1c3250] text-sm font-medium transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Kembali</span>
        </button>

        <div className="w-full max-w-md space-y-8 mt-6 sm:mt-0">
          <div className="text-left">
            <h2 className="font-readex text-3xl font-extrabold text-[#1c3250]">
              Selamat Datang
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Silakan masuk ke akun Anda
            </p>
          </div>

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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-4 pr-11 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    /* Icon Mata Terbuka */
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    /* Icon Mata Tertutup / Dicoret */
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.858A9.954 9.954 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#fde047] hover:bg-[#facc15] text-[#1c3250] font-bold rounded-xl transition-all shadow-sm duration-200 disabled:opacity-50 cursor-pointer"
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