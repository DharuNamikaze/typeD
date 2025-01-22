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
            <Link href="/">
            <h1 className="pt-10">typeD - Typing App</h1>
            </Link>
          </header>
        {children}
        </div>
      </body>
    </html>
  );
}
export default RootLayout;
