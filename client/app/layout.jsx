import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import OfflineOnlineProvider from "@/components/offline-online-provider";
import AuthProvider from "@/auth/context/jwt/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flow Board",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <OfflineOnlineProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster
                position="top-right"
                richColors // More vibrant colors
                closeButton // Add close button
              />
              {children}
            </ThemeProvider>
          </OfflineOnlineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
