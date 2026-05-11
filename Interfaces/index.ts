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
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
  };
  price: number;
  isFree: boolean;
  createdAt: Date;
  updatedAt: Date;
  rating?: number;
  category?: string;
  level?: string;
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
