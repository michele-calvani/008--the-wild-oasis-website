export async function GET(request, { params }) {
  const { cabinId } = params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({
      cabin,
      bookedDates,
    });
  } catch {
    return Response.json({
      message: "Something went wrong, cabin not found!!!",
    });
  }
}
