import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";
import { DataProvider } from "./context/DataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KeenKeeper — Keep Your Friendships Alive",
  description: "A personal shelf for meaningful connections.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Navbar />
        
        <DataProvider>
          <main className="flex-grow">
            {children}
          </main>
        </DataProvider>

        {/* Footer*/}
        <Footer /> 
      </body>
    </html>
  );
}