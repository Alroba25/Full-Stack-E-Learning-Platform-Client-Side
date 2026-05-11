import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const addToken = (token: string) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem("token", token);
  }
};
export const removeToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem("token");
  }
};
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
// Helper for handling unauthorized access or expired tokens
const handleUnauthorized = (router?: any, message?: string) => {
  removeToken();
  if (router) {
    router.push("/login");
  }
  toast.error(message || "Session expired. Please login again.", {
    duration: 2000,
  });
};
export const SubmitHandler = async (
  e: React.FormEvent,
  userData: any,
  url: string,
  router?: any,
) => {
  e.preventDefault();
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
        onAutoClose: () => {
          if (router) {
            router.push("/courses");
          }
        },
      });
      addToken(data.token);
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
      } else {
        toast.error(data.message, {
          duration: 1000,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllCourses = async (router?: any, filters?: any) => {
  try {
    const query = new URLSearchParams();
    if (filters?.category?.length) {
      query.append("category", filters.category.join(","));
    }
    if (filters?.level?.length) {
      query.append("level", filters.level.join(","));
    }

    if (filters?.rating) {
      query.append("rating", filters.rating.toString());
    }

    const res = await fetch(`${BASE_URL}/courses?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getCourse = async (id: string, router?: any) => {
  try {
    const res = await fetch(`${BASE_URL}/course/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getCourseLessons = async (courseId: string, router?: any) => {
  try {
    const res = await fetch(`${BASE_URL}/course/${courseId}/lessons`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const enrollInCourse = async (courseId: string, router?: any) => {
  try {
    const res = await fetch(`${BASE_URL}/enroll/${courseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
      });
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getMyCourses = async (router?: any) => {
  try {
    const res = await fetch(`${BASE_URL}/my-courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const makelessonCompleted = async (lessonId: string, router?: any) => {
  try {
    const res = await fetch(`${BASE_URL}/lesson/${lessonId}/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
      });
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getProfile = async (router?: any) => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getInstructorCourses = async (router?: any) => {
  try {
    const res = await fetch(`${BASE_URL}/instructor-courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getInstrucortCoursesUsers = async (router?: any) => {
  try {
    const res = await fetch(`${BASE_URL}/instructor-courses-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const createCourse = async (courseData: any, router?: any) => {
  try {
    const res = await fetch(`${BASE_URL}/course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(courseData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
        onAutoClose: () => {
          if (router) {
            router.push("/instructor-dashboard");
          }
        },
      });
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const addLesson = async (
  courseId: string,
  lessonData: FormData,
  router?: any,
) => {
  try {
    const res = await fetch(`${BASE_URL}/course/${courseId}/lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(lessonData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
        onAutoClose: () => {
          if (router) {
            router.push("/instructor-dashboard");
          }
        },
      });
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteCourse = async (courseId: string, router?: any) => {
  try {
    const res = await fetch(`${BASE_URL}/instructor-course/${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
        onAutoClose: () => {
          if (router) {
            router.push("/instructor-dashboard");
          }
        },
      });
      return data;
    } else {
      if (
        res.status === 401 ||
        data.message === "Login timeout, please login again."
      ) {
        handleUnauthorized(router, data.message);
        return null;
      }
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const askAI = async (message: string) => {
  const res = await fetch(`${BASE_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ message }),
  });

  return await res.json();
};
