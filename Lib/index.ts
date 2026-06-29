import { toast } from "sonner";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const handleUnauthorized = (router?: any, message?: string) => {
  if (router) {
    router.push("/login");
  }
  toast.error(message || "Session expired. Please login again.", {
    duration: 2000,
  });
};
export const SubmitHandler = async (
  userData: any,
  url: string,
  router?: any,
) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      credentials: "include",
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

      return {
        success: true,
      };
    }

    if (
      res.status === 401 ||
      data.message === "Login timeout, please login again."
    ) {
      handleUnauthorized(router, data.message);

      return {
        success: false,
        message: data.message,
      };
    }

    return {
      success: false,
      message: data.message,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Something went wrong",
    };
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      credentials: "include",
      body: lessonData,
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return await res.json();
};
export const createPayment = async (paymentData: any, router?: any) => {
  try {
    const res = await fetch(`${BASE_URL}/payment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(paymentData),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getChatHistory = async () => {
  const res = await fetch(`${BASE_URL}/ai/history`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};
export const clearChatHistory = async () => {
  try {
    const res = await fetch(`${BASE_URL}/ai/history`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
      });
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const getAdminAllPayments = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/payments`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const adminApprovePayment = async (paymentId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/payments/${paymentId}/approve`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
      });
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const adminRejectPayment = async (paymentId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/payments/${paymentId}/reject`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
      });
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const getCoursesByAdmin = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/courses`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const deleteCourseByAdmin = async (courseId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/courses/${courseId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
      });
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const getAllUsersByAdmin = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const toggleUserAdmin = async (userId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/users/${userId}/toggle-admin`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
      });
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const deleteUserByAdmin = async (userId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message, {
        duration: 1000,
      });
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const getStudentOrders = async () => {
  try {
    const res = await fetch(`${BASE_URL}/my-orders`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const getNotifications = async () => {
  try {
    const res = await fetch(`${BASE_URL}/notifications`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const markAllNotificationsAsRead = async () => {
  try {
    const res = await fetch(`${BASE_URL}/notifications/read-all`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
export const getCoursesForHomePage = async () => {
  try {
    const res = await fetch(`${BASE_URL}/home-courses`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong", {
      duration: 1000,
    });
    return null;
  }
};
