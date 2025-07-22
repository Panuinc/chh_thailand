import "@/style/globals.css";
import { Kanit, Nunito } from "next/font/google";
import { Providers } from "./providers";
import { SessionProviders } from "./sessionProvider";
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
    <SessionProviders>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo/logo.png" />
        </head>

        <body className={`${nunito.variable} ${kanit.variable} antialiased`}>
          <Providers>
            <Toaster position="top-right" />
            <div className="flex items-center justify-center w-full h-screen gap-2">
              {children}
            </div>
          </Providers>
        </body>
      </html>
    </SessionProviders>
  );
}
