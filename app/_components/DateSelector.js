"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservations } from "../_library/ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const { range, setRange, resetRange } = useReservations();

  // NEW: rileva se il range selezionato si sovrappone a date prenotate
  const hasOverlap = isAlreadyBooked(range, bookedDates);

  // Se c’è overlap, il range visualizzato viene azzerato
  const displayRange = hasOverlap ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights =
    displayRange.from && displayRange.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const cabinPrice = numNights * (regularPrice - discount);
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex h-full flex-col justify-between">
      <DayPicker
        className="pt-12 mx-auto"
        mode="range"
        selected={displayRange}
        onSelect={setRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      {/* NEW: messaggio di validazione quando l'intervallo viene azzerato per overlap */}
      {hasOverlap && (
        <div
          className="mx-auto mt-3 max-w-[680px] px-4 py-2 rounded-sm border border-yellow-700 bg-yellow-900 text-yellow-100 text-sm"
          role="status"
          aria-live="polite"
        >
          <strong className="font-semibold">Invalid selection:</strong> the t
          the selected range overlaps with booked dates. Choose a different
          period or
          <button onClick={resetRange} className="underline">
            clear the selection
          </button>
          .
        </div>
      )}

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
