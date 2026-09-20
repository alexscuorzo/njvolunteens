import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NJ VolunTeens — Volunteer opportunities for NJ high school students",
    template: "%s | NJ VolunTeens",
  },
  description:
    "Find volunteer opportunities for high school students across New Jersey. Filter by county, cause, and whether hours count toward school service requirements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
            <Link href="/" className="font-bold text-emerald-700 text-lg whitespace-nowrap">
              NJ VolunTeens
            </Link>
            <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-stone-600">
              <Link href="/browse" className="hover:text-emerald-700">
                Browse
              </Link>
              <Link href="/about" className="hover:text-emerald-700 hidden sm:block">
                About
              </Link>
              <Link href="/resources" className="hover:text-emerald-700 hidden sm:block">
                Hour Verification
              </Link>
              <Link
                href="/list-your-organization"
                className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 whitespace-nowrap"
              >
                List Your Org
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-stone-500 flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span>NJVolunteens.org — connecting NJ teens with ways to help.</span>
            <Link href="/about" className="hover:text-emerald-700">
              About
            </Link>
            <Link href="/resources" className="hover:text-emerald-700">
              How service hours work
            </Link>
            <Link href="/list-your-organization" className="hover:text-emerald-700">
              List your organization
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
