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
