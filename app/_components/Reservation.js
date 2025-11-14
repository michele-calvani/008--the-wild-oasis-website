import { getBookedDatesByCabinId, getSettings } from "../_library/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [bookedDates, settings] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="grid grid-cols-[1.2fr_1fr] gap-10 border border-primary-800 min-h-[480px] overflow-hidden">
      <DateSelector
        className="min-w-0"
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm className="min-w-0" cabin={cabin} />
    </div>
  );
}

export default Reservation;
