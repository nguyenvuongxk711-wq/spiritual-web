import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SeasonalParticles from "./components/SeasonalParticles";
import GlobalQuickNav from "./components/GlobalQuickNav";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tamlinhviet.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tâm Linh Việt - Tử Vi, Thần Số Học, Tarot & Hơn Thế",
    template: "%s | Tâm Linh Việt",
  },
  description:
    "Khám phá bản thân qua Tử Vi, Thần Số Học, Tarot, Cung Hoàng Đạo, Lịch Vạn Niên và các công cụ tâm linh hiện đại.",
  keywords: [
    "tử vi", "lá số tử vi", "thần số học", "tarot", "cung hoàng đạo",
    "lịch vạn niên", "xem ngày tốt", "phong thủy", "kinh dịch", "tâm linh",
  ],
  authors: [{ name: "Tâm Linh Việt" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Tâm Linh Việt",
    title: "Tâm Linh Việt - Tử Vi, Thần Số Học, Tarot & Hơn Thế",
    description:
      "Khám phá bản thân qua Tử Vi, Thần Số Học, Tarot, Cung Hoàng Đạo, Lịch Vạn Niên và các công cụ tâm linh hiện đại.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tâm Linh Việt - Tử Vi, Thần Số Học, Tarot",
    description:
      "Khám phá bản thân qua Tử Vi, Thần Số Học, Tarot, Cung Hoàng Đạo và các công cụ tâm linh hiện đại.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-season="default" suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-universe">
        <ThemeProvider>
          <SeasonalParticles />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <GlobalQuickNav />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
