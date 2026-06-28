import { Smartphone } from "lucide-react";
import { PaymentMethod } from "@/Interfaces";
const PAYMENT_CONFIG = {
  vodafone: { label: "Vodafone Cash", icon: Smartphone, color: "#e60026" },
  etisalat: { label: "Etisalat Cash", icon: Smartphone, color: "#e60026" },
  orange: { label: "Orange Cash", icon: Smartphone, color: "#ff7902" },
};

export default function PaymentBadge({ method }: { method: PaymentMethod }) {
  const cfg = PAYMENT_CONFIG[method as keyof typeof PAYMENT_CONFIG];
  const Icon = cfg.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold"
      style={{ color: cfg.color }}
    >
      <Icon size={12} />
      {cfg.label}
    </span>
  );
}
