import { ReactNode } from "react";

export default function StatCard({
  icon,
  label,
  value,
  sub,
  accentColor,
  glowColor,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accentColor: string;
  glowColor: string;
}) {
  return (
    <div className="group relative bg-white/3 hover:bg-white/6 border border-white/8 hover:border-white/15 rounded-2xl p-6 transition-all duration-300 overflow-hidden cursor-default">
      {/* Subtle glow */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ backgroundColor: glowColor }}
      />
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center border"
          style={{
            backgroundColor: `${accentColor}15`,
            borderColor: `${accentColor}30`,
          }}
        >
          {icon}
        </div>
        <span className="text-3xl font-black text-white">{value}</span>
      </div>
      <p className="text-sm font-semibold text-[#d1d7dc]">{label}</p>
      {sub && <p className="text-xs text-[#666] mt-1">{sub}</p>}
    </div>
  );
}
