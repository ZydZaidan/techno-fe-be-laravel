const TrackingStatus = () => {
  const steps = [
    { label: "Draft Submitted", done: true, date: "03 Sep 2026" },
    { label: "Verifikasi Administrasi", done: true, active: true, date: "Sedang Diproses" },
    { label: "Penilaian Substantif Reviewer", done: false, date: "-" },
    { label: "Keputusan Final & Penetapan", done: false, date: "-" },
  ];

  return (
    <div className="space-y-6 font-poppins">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#092B52]">Real-time Status Tracking</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Pantau perkembangan tahapan seleksi pengajuan kamu secara transparan.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[10px] font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200">
            Inkubasi Bisnis
          </span>
          <h3 className="text-lg font-bold text-[#092B52] mt-2">IoT Smart Metering Grid System</h3>
          <p className="text-xs text-slate-400">Kode Pengajuan: TNT-2026-0001</p>
        </div>

        {/* STEPPER PROGRESS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${step.active ? 'border-[#188B9E] bg-cyan-50/50' : 'border-slate-100 bg-slate-50'}`}>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step.done ? 'bg-[#188B9E] text-white' : 'bg-slate-300 text-slate-600'}`}>
                  {idx + 1}
                </div>
                <h4 className="text-xs font-bold text-[#092B52]">{step.label}</h4>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 pl-8">{step.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingStatus;