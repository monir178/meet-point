import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meet Point",
  description: "Video calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/icons/logo-flat.svg",
            socialButtonsVariant: "iconButton",
            socialButtonsPlacement: "top",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#2563eb",
            colorBackground: "#030021",
            colorInputBackground: "#111827",
            colorInputText: "#fff",
          },
        }}>
        <body className={`${inter.className} bg-dark-2 max-w-[2560px] `}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
