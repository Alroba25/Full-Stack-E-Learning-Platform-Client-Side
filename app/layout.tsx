import type { Metadata } from "next";
import { Playwrite_DE_SAS, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const playwrite = Playwrite_DE_SAS({
  variable: "--font-playwrite",
  weight: "400",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://darsify.com"),
  title: {
    default: "Darsify - Premium E-Learning Platform",
    template: "%s | Darsify",
  },
  description: "Experience world-class education with Darsify. Access industry-leading courses designed by experts and join a community of 50,000+ students learning the future today.",
  keywords: ["e-learning", "online courses", "education", "skills", "web development", "data science", "design", "business", "marketing"],
  authors: [{ name: "Darsify Team" }],
  creator: "Darsify",
  publisher: "Darsify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://darsify.com",
    siteName: "Darsify",
    title: "Darsify - Premium E-Learning Platform",
    description: "Master new skills with industry-leading courses. Elevate your career with Darsify.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Darsify Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darsify - Premium E-Learning Platform",
    description: "Master new skills with industry-leading courses. Elevate your career with Darsify.",
    images: ["/logo.png"],
    creator: "@darsify",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playwrite.variable} ${robotoSlab.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
