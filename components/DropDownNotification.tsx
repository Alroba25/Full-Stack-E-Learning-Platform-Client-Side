import {
  Bell,
  BookOpen,
  CircleCheckBig,
  CircleX,
  Clock3,
  CreditCard,
} from "lucide-react";
import { DropDownNotificationProps } from "@/Interfaces";
export default function DropDownNotification({
  notifications,
  open,
  dropdownRef,
}: DropDownNotificationProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment":
        return CreditCard;

      case "approved":
        return CircleCheckBig;

      case "rejected":
        return CircleX;

      case "course":
        return BookOpen;

      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "payment":
        return "text-blue-400 bg-blue-500/10";

      case "approved":
        return "text-emerald-400 bg-emerald-500/10";

      case "rejected":
        return "text-red-400 bg-red-500/10";

      case "course":
        return "text-purple-400 bg-purple-500/10";

      default:
        return "text-gray-400 bg-white/5";
    }
  };
  return (
    <div ref={dropdownRef}>
      {open && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 w-[95vw] max-w-[380px]
  md:absolute md:top-auto md:left-auto md:right-0
  md:translate-x-0 md:w-[390px]
  rounded-2xl border border-white/10 bg-[#090909]/95 backdrop-blur-xl shadow-2xl
  overflow-hidden z-999
"
        >
          {/* Header */}

          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div>
              <h3 className="font-bold text-white text-sm">Notifications</h3>

              <p className="text-xs text-gray-500 mt-1">
                {notifications.length} notifications
              </p>
            </div>

            <Bell className="text-blue-400" size={18} />
          </div>

          {/* Body */}

          <div className="max-h-[420px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-14 flex flex-col items-center gap-3">
                <Bell size={40} className="text-gray-700" />

                <p className="text-gray-500 text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((item: any) => {
                const Icon = getNotificationIcon(item.type);

                return (
                  <div
                    key={item._id}
                    className="flex gap-4 px-5 py-4 border-b border-white/5 hover:bg-white/5 transition-all duration-200 cursor-pointer"
                  >
                    {/* Icon */}

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getNotificationColor(item.type)}`}
                    >
                      <Icon size={18} />
                    </div>

                    {/* Content */}

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-white text-sm">
                          {item.title}
                        </h4>

                        {!item.isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                        )}
                      </div>

                      <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                        {item.message}
                      </p>

                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                        <Clock3 size={12} />

                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
