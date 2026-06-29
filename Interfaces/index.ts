export interface FormState {
  name: string;
  email: string;
  password: string;
}
export interface LoginState {
  email: string;
  password: string;
}
export interface CourseState {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: {
    _id: string;
    name: string;
  };
  price: number;
  isFree: boolean;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  category: string[];
  level: string;
}
export interface LessonState {
  id: number;
  title: string;
  type: string;
  videoUrl: string;
  content: string;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
export interface IStudent {
  progress: number;
  user: { name: string; email: string; image: string; role: string };
  course?: { title: string };
  createdAt?: string | Date;
}
export interface IFilter {
  category: string[];
  rating: number | null;
  level: string[];
}
export interface DropDownNotificationProps {
  notifications: any[];
  open: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}
export interface PaymentItemState {
  _id: string;
  student: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  course: {
    _id: string;
    title: string;
    imageUrl: string;
    price: number;
  };
  paymentMethod: string;
  paymentProof: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  status: "approved" | "pending" | "rejected";
}
export interface UserState {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmClass: string;
  image?: string;
  iconsBgClass: string;
  onConfirm: () => void;
}
export type Tab = "overview" | "courses" | "users" | "payments";
export type PaymentMethod = "vodafone" | "etisalat" | "orange";
export type OrderStatus = "approved" | "pending" | "rejected";
