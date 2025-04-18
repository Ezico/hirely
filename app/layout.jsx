import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Dashboard",
  description: "Responsive user dashboard",
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
