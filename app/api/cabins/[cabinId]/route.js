import { getCabin, getBookedDatesByCabinId } from "@/app/_library/data-service";

export async function GET(request, { params }) {
  const cabinId = params.cabinId;

  const [cabin, bookedDates] = await Promise.all([
    getCabin(cabinId),
    getBookedDatesByCabinId(cabinId),
  ]);

  return Response.json({ cabin, bookedDates });
}
