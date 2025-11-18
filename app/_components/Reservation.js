import { getBookedDatesByCabinId, getSettings } from "../_library/data-service";
/* import { getServerSession } from "next-auth";
import { authConfig } from "@/app/_library/auth"; */
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";
import { auth } from "../_library/auth";

async function Reservation({ cabin }) {
  const session = await auth();
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);
  return (
    <div className="grid grid-cols-[1.2fr_1fr] gap-10 border border-primary-800 min-h-[480px] overflow-hidden">
      <DateSelector
        className="min-w-0"
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm
          className="min-w-0"
          cabin={cabin}
          user={session.user}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
