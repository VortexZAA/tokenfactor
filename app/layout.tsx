import type { Metadata } from "next";
import { Exo } from "next/font/google";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Providers from "@/contexts/Providers";

import "./globals.css";
import "@burnt-labs/ui/dist/index.css";
import "@burnt-labs/abstraxion/dist/index.css";
import NotificationModal from "@/components/Modal/NotificationModal";
import NextTopLoader from "nextjs-toploader";

const exo = Exo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Token Factory",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo.className} text-ghost-white`}>
        <Providers>
          <div className="px-4 md:px-[64px] mx-auto bg-maasblue/90 overflow-x-hidden max-w-[100vw]" >
            <NotificationModal />
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
        <NextTopLoader
          color="#F8B810"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #F8B810,0 0 5px #F8B810"
        />
      </body>
    </html>
  );
}