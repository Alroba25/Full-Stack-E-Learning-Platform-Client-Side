"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { registerInputs } from "@/Data";
import { SubmitHandler } from "@/Lib";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

interface FormState {
  [key: string]: string;
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });
  const [isInstructor, setIsInstructor] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (isInstructor) {
        SubmitHandler(e, formData, "/register/instructor", router);
        setFormData({ name: "", email: "", password: "" });
        return;
      }
      SubmitHandler(e, formData, "/register", router);
      setFormData({ name: "", email: "", password: "" });
    },
    [formData, isInstructor, router],
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white font-sans relative overflow-hidden p-8">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(138,43,226,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] rounded-full z-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,255,255,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>

      <Link
        href="/"
        className="absolute top-8 left-8 text-[#a0a0a0] font-semibold text-sm flex items-center gap-2 hover:text-white transition-colors z-20"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-[450px] p-12 rounded-[24px] bg-[#141414]/60 backdrop-blur-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-500">
        <div className="text-3xl font-extrabold text-center mb-2 bg-linear-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent tracking-tighter">
          E-Platform
        </div>
        <h1 className="text-center text-2xl font-bold mb-2 text-white">Create Account</h1>
        <p className="text-center text-[0.95rem] text-[#a0a0a0] mb-10">
          Join thousands of learners worldwide
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {registerInputs.map((input) => (
            <div key={input.id}>
              <label htmlFor={input.id} className="block text-sm font-semibold mb-2 text-[#d0d0d0]">
                {input.label}
              </label>
              <input
                type={input.type}
                id={input.id}
                name={input.name}
                placeholder={input.placeholder}
                className="w-full px-4 py-3.5 bg-black/30 border border-white/10 rounded-xl text-white text-base transition-all outline-none focus:border-[#4facfe] focus:ring-4 focus:ring-[#4facfe]/20 focus:bg-black/50 placeholder:text-[#666]"
                value={formData[input.name] || ""}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="flex items-center gap-2 py-2">
            <Checkbox
              id="instructor-checkbox"
              checked={isInstructor}
              onCheckedChange={(checked) => setIsInstructor(checked === true)}
            />
            <label
              htmlFor="instructor-checkbox"
              className="text-sm font-semibold text-[#d0d0d0] cursor-pointer"
            >
              Join as an Instructor
            </label>
          </div>

          <button
            className="w-full py-4 bg-linear-to-br from-[#667eea] to-[#764ba2] rounded-xl text-white font-bold text-lg hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(118,75,162,0.4)] transition-all mt-4"
            type="submit"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-8 text-sm text-[#a0a0a0]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#00f2fe] font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
