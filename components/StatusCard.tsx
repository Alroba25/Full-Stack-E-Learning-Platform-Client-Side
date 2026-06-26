export default function StatCard({
  label,
  value,
  sub,
  icon,
  gradient,
  glow,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
  gradient: string;
  glow: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-6 backdrop-blur-xl hover:border-white/10 transition-all group`}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${glow}`}
      />
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
            {label}
          </p>
          <p className="text-3xl font-black text-white tracking-tight">
            {value}
          </p>
          <p className="text-xs text-emerald-400 font-semibold mt-1.5">{sub}</p>
        </div>
        <div
          className={`size-12 rounded-2xl ${gradient} flex items-center justify-center shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
