import { useState, useEffect } from "react";
import API,{getFileUrl} from "../../../services/api";

const TrackingStatus = () => {
  const [listInkubasi, setListInkubasi] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await API.get("/techno/inkubasi/my");

        if (res.data.success && res.data.data) {
          const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
          setListInkubasi(data);
        }
      } catch (err) {
        console.error("Gagal mengambil status pengajuan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs font-poppins md:ml-64">
        Memuat status pengajuan...
      </div>
    );
  }

  if (listInkubasi.length === 0) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-100 text-center text-slate-500 text-xs font-poppins md:ml-64">
        Kamu belum pernah mengirimkan proposal pengajuan inkubasi.
      </div>
    );
  }

  const dataInkubasi = listInkubasi[selectedIndex] || listInkubasi[0];

// --- LOGIKA STATUS & TAHAPAN ---
  const statusVerifikasi = dataInkubasi.status_verifikasi || "Pending";
  const statusUtama = dataInkubasi.status || "Pending";
  const rekomendasi = dataInkubasi.rekomendasi;

  // 1. Verifikasi Status
  const isLolosVerifikasi = statusVerifikasi === "Lolos";
  const isGagalVerifikasi = statusVerifikasi === "Tidak Lolos" || statusVerifikasi === "Ditolak";
  const isRevisiVerifikasi = statusVerifikasi === "Revisi";

  // 2. Reviewer Status (Step 3)
  const isEvaluated = Boolean(
    (rekomendasi && rekomendasi !== "") ||
    (dataInkubasi.total_skor !== null && Number(dataInkubasi.total_skor) > 0) ||
    statusUtama === "Inkubasi" ||
    statusUtama === "Inkubasi Selesai" ||
    statusUtama === "Selesai" ||
    statusUtama === "Ditolak"
  );

  const isLolosReview = isEvaluated && (rekomendasi === "Lolos" || statusUtama === "Inkubasi" || statusUtama === "Inkubasi Selesai" || statusUtama === "Selesai");
  const isDitolakReview = isEvaluated && (rekomendasi === "Ditolak" || statusUtama === "Ditolak");

  // 3. Inkubasi Status (Step 4)
  // PERBAIKAN: Jika sudah Lolos Review (Card 3 hijau), otomatis jalankan Proses Inkubasi di Card 4.
  const isInkubasiSelesai = statusUtama === "Inkubasi Selesai" || statusUtama === "Selesai";
  const isProsesInkubasi = (isLolosReview && !isInkubasiSelesai) || statusUtama === "Inkubasi";

  // STEPPER CONFIG
  const steps = [
    {
      label: "Proposal Terkirim",
      statusText: dataInkubasi.created_at
        ? new Date(dataInkubasi.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Terkirim",
      state: "done",
    },
    {
      label: "Verifikasi Administrasi",
      statusText: isLolosVerifikasi
        ? "Lolos Verifikasi"
        : isRevisiVerifikasi
        ? "Perlu Revisi Berkas"
        : isGagalVerifikasi
        ? "Tidak Lolos Administrasi"
        : "Sedang Diverifikasi",
      state: isLolosVerifikasi
        ? "done"
        : isGagalVerifikasi
        ? "failed"
        : "active",
    },
    {
      label: "Penilaian Reviewer",
      statusText: !isLolosVerifikasi
        ? "Menunggu Verifikasi"
        : isDitolakReview
        ? "Tidak Lolos Review"
        : isLolosReview
        ? "Lolos Review"
        : "Sedang Dinilai Reviewer",
      state: !isLolosVerifikasi
        ? "pending"
        : isDitolakReview
        ? "failed"
        : isLolosReview
        ? "done"
        : "active",
    },
    {
      label: "Masa & Status Inkubasi",
      statusText: isInkubasiSelesai
        ? "Inkubasi Selesai"
        : isProsesInkubasi
        ? "Proses Inkubasi" // Teks diubah sesuai permintaan
        : isDitolakReview || isGagalVerifikasi
        ? "Pengajuan Berakhir"
        : "Belum Dimulai",
      state: isInkubasiSelesai
        ? "done"
        : isProsesInkubasi
        ? "active"
        : isDitolakReview || isGagalVerifikasi
        ? "failed"
        : "pending",
    },
  ];



  // Helper Banner Summary
  const renderBannerStatus = () => {
    if (isInkubasiSelesai) {
      return {
        bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
        title: "Program Inkubasi Selesai",
        desc: "Tim kamu telah menyelesaikan seluruh tahapan program inkubasi bisnis.",
      };
    }
    if (isProsesInkubasi) {
      return {
        bg: "bg-cyan-50 border-cyan-200 text-[#092B52]",
        title: "Program Inkubasi Sedang Berjalan",
        desc: "Proposal kamu dinyatakan LOLOS review. Tim kamu saat ini resmi berada dalam masa inkubasi.",
      };
    }
    if (isDitolakReview || isGagalVerifikasi) {
      return {
        bg: "bg-rose-50 border-rose-200 text-rose-800",
        title: "Pengajuan Tidak Lolos",
        desc: "Mohon maaf, pengajuan proposal kamu belum memenuhi kriteria seleksi program inkubasi.",
      };
    }
    if (isLolosVerifikasi && !isEvaluated) {
      return {
        bg: "bg-amber-50 border-amber-200 text-amber-800",
        title: "Sedang Dalam Tahap Penilaian Reviewer",
        desc: "Berkas administrasi telah LOLOS. Saat ini proposal sedang ditinjau oleh Reviewer.",
      };
    }
    return {
      bg: "bg-blue-50 border-blue-200 text-blue-800",
      title: "Verifikasi Berkas Administrasi",
      desc: "Proposal kamu sudah terkirim dan sedang diperiksa oleh Verifikator.",
    };
  };

  const banner = renderBannerStatus();

  return (
    <div className="space-y-6 md:ml-64 font-poppins pt-8 px-4 md:px-8 pb-16 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">
            Real-time Status Tracking
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau perkembangan tahapan seleksi pengajuan kamu secara transparan.
          </p>
        </div>

        {listInkubasi.length > 1 && (
          <div className="flex items-center gap-2">
            <select
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              className="bg-white border border-slate-200 text-xs text-[#092B52] rounded-xl px-3 py-2 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#188B9E]"
            >
              {listInkubasi.map((item, index) => (
                <option key={item.id || index} value={index}>
                  {item.nama_tim} ({item.kategori_bisnis})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className={`p-4 rounded-2xl border ${banner.bg} transition-all`}>
        <h4 className="text-sm font-bold">{banner.title}</h4>
        <p className="text-xs mt-1 opacity-90">{banner.desc}</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex flex-wrap justify-between items-start gap-4">
          <div>
            <span className="text-[10px] font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200">
              {dataInkubasi.kategori_bisnis || "Inkubasi Bisnis"}
            </span>
            <h3 className="text-lg font-bold text-[#092B52] mt-2">
              {dataInkubasi.nama_tim}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Reviewer: <span className="font-semibold text-slate-600">{dataInkubasi.reviewer_nama || "Belum di-assign"}</span>
            </p>
          </div>

          {dataInkubasi.file_dokumen && (
            <a 
  href={getFileUrl(dataInkubasi.file_dokumen)} 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-[#188B9E] font-semibold hover:underline"
>
              📄 Lihat Proposal
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => {
            let cardBg = "bg-slate-50 border-slate-100";
            let badgeBg = "bg-slate-300 text-slate-600";
            let textColor = "text-slate-400";

            if (step.state === "done") {
              cardBg = "bg-emerald-50/50 border-emerald-200";
              badgeBg = "bg-emerald-500 text-white";
              textColor = "text-emerald-700 font-medium";
            } else if (step.state === "active") {
              cardBg = "bg-cyan-50/60 border-[#188B9E] ring-1 ring-[#188B9E]/30";
              badgeBg = "bg-[#188B9E] text-white animate-pulse";
              textColor = "text-[#188B9E] font-bold";
            } else if (step.state === "failed") {
              cardBg = "bg-rose-50/50 border-rose-200";
              badgeBg = "bg-rose-500 text-white";
              textColor = "text-rose-600 font-medium";
            }

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${cardBg}`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${badgeBg}`}
                  >
                    {step.state === "done" ? "✓" : step.state === "failed" ? "✕" : idx + 1}
                  </div>
                  <h4 className="text-xs font-bold text-[#092B52] leading-tight">
                    {step.label}
                  </h4>
                </div>
                <p className={`text-[11px] mt-3 pl-8 ${textColor}`}>
                  {step.statusText}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackingStatus;