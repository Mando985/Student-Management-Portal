import type { Metadata, Viewport } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const noto = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Student Management Portal",
  description: "Track academic results and marks across semesters.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

const themeScript = `
try {
  var t = localStorage.getItem("theme");
  var dark = t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (dark) document.documentElement.classList.add("dark");
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    
    <html lang="en" className={`${figtree.variable} ${noto.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
