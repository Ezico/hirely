import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Perfect Job Match",
  description:
    "Discover tailored job opportunities based on your skills, education with Hirely AI. Smart, fast, and made just for you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased pattern`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
