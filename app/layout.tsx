import NavBar from "@/components/NavBar";
import "./globals.css";
import { Metadata } from "next";
import { Quicksand, Bungee, Montserrat } from "next/font/google";

//TODO not 100% sure this is correct, or needed
// const coromantGaramond = Cormorant_Garamond({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   display: 'swap',
//   variable: '--font-coromat-garamond',
// });

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

const bungee = Bungee({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-bungee",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${bungee.variable} ${montserrat.variable}`}
    >
      <body>
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
