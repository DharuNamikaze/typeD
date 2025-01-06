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
            <span  className="m-10 inline-block justify-center typedheader">typeD - Minimalist Typing App</span>
            </Link>
          </header>
        {children}
        </div>
      </body>
    </html>
  );
}
export default RootLayout;
