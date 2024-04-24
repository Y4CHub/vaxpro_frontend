import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";



export const metadata = {
  title: "VaxPro",
  description: "Vaccination platform for promotion and sensitization",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-monte w-screen max-h-screen`}>
        <Sidebar />
        <Main> {children} </Main>
        <footer></footer>
      </body>
    </html>
  );
}
