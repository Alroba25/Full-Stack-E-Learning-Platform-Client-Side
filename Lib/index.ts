import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const addToken = (token: string) => {
  return localStorage.setItem("token", token);
};
export const removeToken = () => {
  return localStorage.removeItem("token");
};
export const getToken = () => {
  return localStorage.getItem("token");
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
        onAutoClose: () => router.push("/courses"),
      });
      addToken(data.token);
    } else {
      toast.error(data.message, {
        duration: 1000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
