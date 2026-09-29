import { useState, useEffect, useMemo, useCallback } from "react";
import API from "../../../services/api";

const ManajemenUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("Semua");

  // State Modal & Form Tambah User
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    role: "user",
    nim_nidn: "",
    jurusan: "",
    no_hp: "",
  });

  // Fetch daftar seluruh pengguna dari Backend
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/techno/admin/users");
      if (response.data?.success) {
        setUsers(response.data.data || []);
      }
    } catch (error) {
      console.error("Gagal memuat data pengguna:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchUsers();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  // Handle Input Change Form Modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit Form Tambah User Baru
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await API.post("/techno/admin/users", formData);
      if (response.data?.success) {
        alert(response.data.message || "User berhasil dibuat!");
        setIsModalOpen(false);
        setFormData({
          nama: "",
          email: "",
          password: "",
          role: "user",
          nim_nidn: "",
          jurusan: "",
          no_hp: "",
        });
        fetchUsers();
      }
    } catch (error) {
      console.error("Gagal membuat user:", error);
      alert(error.response?.data?.message || "Gagal membuat pengguna baru.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Ubah Role Pengguna
  const handleRoleChange = async (userId, newRole) => {
    const confirmMsg = `Ubah role pengguna ini menjadi "${newRole}"?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      const response = await API.put(`/techno/admin/users/${userId}/role`, {
        role: newRole,
      });

      if (response.data?.success) {
        alert("Role pengguna berhasil diperbarui!");
        fetchUsers();
      }
    } catch (error) {
      console.error("Gagal memperbarui role:", error);
      alert(
        error.response?.data?.message || "Gagal memperbarui role pengguna."
      );
    }
  };

  // Handle Hapus Pengguna
  const handleDeleteUser = async (userId, userName) => {
    const confirmMsg = `Apakah Anda yakin ingin menghapus pengguna "${userName}"? Action ini tidak dapat dibatalkan.`;
    if (!window.confirm(confirmMsg)) return;

    try {
      const response = await API.delete(`/techno/admin/users/${userId}`);
      if (response.data?.success) {
        alert("Pengguna berhasil dihapus.");
        fetchUsers();
      }
    } catch (error) {
      console.error("Gagal menghapus pengguna:", error);
      alert(
        error.response?.data?.message || "Gagal menghapus akun pengguna."
      );
    }
  };

  // Filter & Search Logic
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.user_code?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        filterRole === "Semua" ? true : u.role === filterRole;

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, filterRole]);

  return (
    <div className="space-y-6 md:ml-64 font-poppins pt-8 px-4 md:px-8 pb-16 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">
            Manajemen Pengguna
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola hak akses dan peran akun administrator, verifikator, reviewer, dan pengguna.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#188B9E] hover:bg-[#137181] text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <span>➕</span> Tambah Pengguna
        </button>
      </div>

      {/* Filter & Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Input Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Cari nama, email, atau ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 pl-9 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#188B9E] outline-none"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">
              🔍
            </span>
          </div>

          {/* Filter Role */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs font-semibold text-slate-600 shrink-0">
              Role:
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#188B9E] outline-none"
            >
              <option value="Semua">Semua Role</option>
              <option value="administrator">Administrator</option>
              <option value="verifikator">Verifikator</option>
              <option value="reviewer">Reviewer</option>
              <option value="user">User / Tenant</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium self-end sm:self-auto">
          Total: <span className="font-bold text-[#092B52]">{filteredUsers.length}</span> Pengguna
        </div>
      </div>

      {/* Tabel Data Users */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          {isLoading ? (
            <p className="text-xs text-slate-400 text-center py-8 font-medium">
              Memuat data pengguna...
            </p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8 font-medium">
              Tidak ada pengguna yang ditemukan.
            </p>
          ) : (
            <table className="w-full text-left text-xs min-w-175">
              <thead className="bg-[#F8FAFC] text-slate-600 font-semibold border-b border-slate-100 uppercase text-[11px]">
                <tr>
                  <th className="p-4">User Code / Nama</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Ubah Role</th>
                  <th className="p-4">Tanggal Daftar</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-[#092B52]">{u.nama}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {u.user_code || `ID: ${u.id}`}
                      </p>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{u.email}</td>
                    <td className="p-4">
                      <select
                        value={u.role || "user"}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                          u.role === "administrator"
                            ? "bg-purple-50 border-purple-200 text-purple-800"
                            : u.role === "reviewer"
                            ? "bg-amber-50 border-amber-200 text-amber-800"
                            : u.role === "verifikator"
                            ? "bg-blue-50 border-blue-200 text-blue-800"
                            : "bg-emerald-50 border-emerald-200 text-emerald-800"
                        }`}
                      >
                        <option value="administrator">Administrator</option>
                        <option value="verifikator">Verifikator</option>
                        <option value="reviewer">Reviewer</option>
                        <option value="user">User / Tenant</option>
                      </select>
                    </td>
                    <td className="p-4 text-slate-500">
                      {u.created_at
                        ? new Date(u.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDeleteUser(u.id, u.nama)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-[11px] font-semibold transition"
                        title="Hapus Pengguna"
                      >
                        🗑️ Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Tambah User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-[#092B52] text-base">
                Tambah Akun Pengguna Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="nama"
                  required
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="nama@domain.com"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Min 8 karakter"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none bg-white"
                  >
                    <option value="user">User / Tenant</option>
                    <option value="verifikator">Verifikator</option>
                    <option value="reviewer">Reviewer</option>
                    <option value="administrator">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    NIM / NIDN (Opsional)
                  </label>
                  <input
                    type="text"
                    name="nim_nidn"
                    value={formData.nim_nidn}
                    onChange={handleInputChange}
                    placeholder="Nomor Induk"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Jurusan (Opsional)
                  </label>
                  <input
                    type="text"
                    name="jurusan"
                    value={formData.jurusan}
                    onChange={handleInputChange}
                    placeholder="Contoh: Teknik Informatika"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    No. HP (Opsional)
                  </label>
                  <input
                    type="text"
                    name="no_hp"
                    value={formData.no_hp}
                    onChange={handleInputChange}
                    placeholder="0812..."
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#188B9E] outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#188B9E] hover:bg-[#137181] text-white rounded-xl font-semibold transition shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenUser;