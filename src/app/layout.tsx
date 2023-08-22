import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Invearn",
  description: "Your one stop shop to manage your assets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
