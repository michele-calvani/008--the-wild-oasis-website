export const runtime = "nodejs";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationsProvider } from "./_library/ReservationContext";

export const metadata = {
  title: {
    default: "Welcome to The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located right in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export default function Rootlayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased  bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-16 text-lg leading-8">
            <ReservationsProvider>{children}</ReservationsProvider>
          </main>
        </div>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
