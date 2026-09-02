import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = (e) => {
    e.preventDefault();
    
    // MOCK LOGIN: Simpan dummy state ke LocalStorage
    const mockUser = {
      name: "Muhammad Yazid Zaidan",
      email: formData.email || "zaid@technopark.ac.id",
      role: "Admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zaid",
    };

    localStorage.setItem("token", "mock-jwt-token-12345");
    localStorage.setItem("user", JSON.stringify(mockUser));

    // Redirect langsung ke Home
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex font-poppins bg-white">
      {/* 🚀 KOLOM KIRI: BRANDING / BANNER (2-Column Split) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0d3b66] justify-center items-center overflow-hidden">
        {/* Background Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-tr from-[#004e92] via-[#000428]/80 to-[#004e92]/90 z-10 opacity-90" />
        
        {/* Gambar Latar Kampus */}
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"
          alt="Technopark IT-PLN"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content Banner Kiri */}
        <div className="relative z-20 text-center text-white px-12">
          <h1 className="font-readex text-5xl font-extrabold tracking-tight mb-4">
            TECHNOPARK
          </h1>
          <p className="text-cyan-200 text-lg font-light tracking-wide">
            Gateway to Innovation and Collaboration
          </p>
        </div>
      </div>

      {/* 🚀 KOLOM KANAN: FORM LOGIN */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
        <div className="w-full max-w-md space-y-8">
          {/* Header Form */}
          <div className="text-left">
            <h2 className="font-readex text-3xl font-extrabold text-[#1c3250]">
              Selamat Datang
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Silakan masuk ke akun Anda
            </p>
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-custom-cyan/50 focus:border-custom-cyan transition-all"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-custom-cyan focus:ring-custom-cyan border-slate-300"
                />
                Remember me
              </label>
              <a href="#" className="font-semibold text-[#1c3250] hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#fde047] hover:bg-[#facc15] text-[#1c3250] font-bold rounded-xl transition-all shadow-sm duration-200"
            >
              Login ke Dashboard
            </button>
          </form>

          {/* Footer Link Register */}
          <div className="text-center text-sm text-slate-500 pt-4">
            Belum punya akun tenant?{" "}
            <Link to="/register" className="font-bold text-custom-cyan hover:underline">
              Daftar di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;