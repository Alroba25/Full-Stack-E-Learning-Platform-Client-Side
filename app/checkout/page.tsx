"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCourse } from "@/Lib";
import Navbar from "@/components/Navbar";
import {
  ShieldCheck,
  Smartphone,
  Lock,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { paymentMethods } from "@/Data";
export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<string>("vodafone");
  const [paymentProof, setPaymentProof] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        router.push("/courses");
        return;
      }
      try {
        const data = await getCourse(courseId, router);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [courseId, router]);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#a435f0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  const handelSubmit = () => {
    console.log(
      "Selected Method : ",
      selectedMethod,
      "Payment Proof : ",
      paymentProof,
      "Phone Number : ",
      phoneNumber,
    );
  };
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#a435f0]/30">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href={`/courses/${courseId}`}
          className="inline-flex items-center gap-2 text-[#888] hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to course details</span>
        </Link>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Left: Payment Options */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
                Checkout
              </h1>
              <p className="text-[#888] text-lg">
                Choose your preferred payment method to get instant access.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  disabled={method.status === "soon"}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 text-left group
                    ${
                      selectedMethod === method.id
                        ? "bg-white/5 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                        : "bg-white/2 border-white/5 hover:border-white/10 hover:bg-white/04"
                    }
                    ${method.status === "soon" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  `}
                >
                  {selectedMethod === method.id && (
                    <div className="absolute top-4 right-4 text-[#a435f0]">
                      <CheckCircle2
                        size={20}
                        fill="currentColor"
                        className="text-white"
                      />
                    </div>
                  )}

                  <div
                    className="w-16 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl overflow-hidden bg-white/5 relative"
                    style={{
                      backgroundColor:
                        typeof method.logo === "string"
                          ? "white"
                          : `${method.color}20`,
                      color: method.color,
                    }}
                  >
                    {typeof method.logo === "string" ? (
                      <div className="relative w-full h-full p-2">
                        <Image
                          src={method.logo}
                          alt={method.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 64px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      method.logo
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg">{method.name}</span>
                      {method.status === "soon" && (
                        <span className="text-[0.65rem] uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full text-[#888]">
                          Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#888]">{method.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Payment Details Form Placeholder */}
            {selectedMethod && (
              <div className="bg-white/2 border border-white/5 p-8 rounded-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <Smartphone className="text-[#a435f0]" />
                  Pay with{" "}
                  {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                </h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  Number To Send Money :{" "}
                  <span className="text-[#a435f0]">01070072878</span>
                </p>
                <p className="text-[#888] text-sm leading-relaxed">
                  Please enter your wallet number below. You will receive a
                  request on your phone to authorize the payment.
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#cec0fc]">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="01xxxxxxxxx"
                      value={phoneNumber || ""}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#a435f0]/50 transition-colors font-mono text-lg"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-[#cec0fc]">
                        Proof of Payment
                      </label>
                      <p className="text-xs text-[#888]">
                        Please upload a screenshot of your successful transfer
                      </p>
                    </div>

                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPaymentProof(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 bg-white/2 group-hover:bg-white/4 group-hover:border-[#a435f0]/30 transition-all duration-300">
                        {paymentProof ? (
                          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                            <Image
                              src={paymentProof}
                              alt="Payment Proof"
                              fill
                              sizes="(max-width: 768px) 100vw, 800px"
                              className="object-contain bg-black/40 backdrop-blur-md"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-sm font-bold bg-black/60 px-4 py-2 rounded-full">
                                Change Image
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="w-16 h-16 rounded-full bg-[#a435f0]/10 flex items-center justify-center text-[#a435f0]">
                              <Image
                                src="/window.svg"
                                alt="upload"
                                width={32}
                                height={32}
                                className="opacity-40 group-hover:scale-110 transition-transform"
                              />
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-white group-hover:text-[#a435f0] transition-colors">
                                Click to upload screenshot
                              </p>
                              <p className="text-xs text-[#888] mt-1">
                                Supports PNG, JPG (Max 5MB)
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!phoneNumber || !paymentProof}
                    onClick={handelSubmit}
                    className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full py-4 bg-linear-to-r from-[#a435f0] to-[#8710d8] rounded-xl font-extrabold text-lg hover:shadow-[0_10px_30px_rgba(164,53,240,0.3)] transition-all active:scale-[0.98]"
                  >
                    Buy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <aside className="sticky top-28 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-xl">
              <h2 className="text-2xl font-extrabold">Order Summary</h2>

              {/* Course Card */}
              <div className="flex gap-4 p-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={
                      course?.course?.imageUrl || "/Darsfiy-cover-course.png"
                    }
                    alt={course?.course?.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                  <h4 className="font-bold text-sm line-clamp-2 leading-snug">
                    {course?.course?.title}
                  </h4>
                  <p className="text-xs text-[#888] mt-1">
                    By {course?.course?.instructor?.name}
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4 pt-4">
                {/* <div className="flex justify-between text-[#888]">
                  <span>Original Price</span>
                  <span className="line-through text-white/40">$149.99</span>
                </div> */}
                {/* <div className="flex justify-between text-[#888]">
                  <span>Discount (85% Off)</span>
                  <span className="text-green-500">-$120.00</span>
                </div> */}
                <div className="h-px bg-white/10 my-2"></div>
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-extrabold text-[#a435f0]">
                    ${course?.course?.price}
                  </span>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-3 text-xs text-[#888] bg-white/5 p-4 rounded-xl">
                  <ShieldCheck size={20} className="text-green-500 shrink-0" />
                  <p>Your connection is secure and your data is encrypted.</p>
                </div>
                <div className="flex items-center justify-center gap-4 opacity-40">
                  <Lock size={14} />
                  <span className="text-[0.65rem] uppercase tracking-widest font-bold">
                    Secure Checkout
                  </span>
                </div>
              </div>
            </div>

            {/* Satisfaction Guarantee */}
            <div className="p-6 border border-dashed border-white/10 rounded-3xl text-center space-y-2">
              <CheckCircle2 size={24} className="mx-auto text-white/20" />
              <h4 className="font-bold text-sm">30-Day Money-Back Guarantee</h4>
              <p className="text-xs text-[#888]">
                Not satisfied? Get a full refund, no questions asked.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 text-center mt-12">
        <p className="text-[#888] text-sm">
          &copy; 2026 E-Platform Learning. Secure Payment Powered by PayMob.
        </p>
      </footer>
    </div>
  );
}
