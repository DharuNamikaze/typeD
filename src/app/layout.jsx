import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Minimalistic Typing App",
  description: "Inspired by MonkeyType",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <header>
            <Link href="#">
            <span  className="m-10 inline-block px-2 py-1 bg-white text-black">typeD - Minimalist Typing App</span>
            </Link>
          </header>
        {children}
        </div>
      </body>
    </html>
  );
}
export default RootLayout;
