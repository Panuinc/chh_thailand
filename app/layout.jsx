import "@/style/globals.css";
import { Kanit, Nunito } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--kanit",
  weight: "300",
  display: "swap",
});
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--nunito",
  weight: "300",
  display: "swap",
});

export const metadata = {
  title: "CHH Industry",
  description: "CHH Internal System",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <link rel="icon" href="/logoCompany/com-1.png" />
        </head>
        <body className={`${nunito.variable} ${kanit.variable} antialiased`}>
          <Toaster position="top-right" />
          <div className="flex items-center justify-center w-full h-screen gap-2 bg-[#F0F0F0]">
            {children}
          </div>
        </body>
      </html>
    </Providers>
  );
}
