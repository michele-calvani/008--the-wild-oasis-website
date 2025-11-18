"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuestProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be signed in to update your profile");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID number (6-12 digits).");
  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  // Aggiorniamo la tabella di supabase
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);
  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be signed in to update a reservation");

  // Controlliamo se l'utente può modificare la prenotazione
  const reservationId = Number(formData.get("id"));
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => Number(booking.id));
  if (!guestBookingIds.includes(reservationId))
    throw new Error("You can only update your own reservations.");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // Aggiorniamo la tabella di supabase
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", reservationId);
  if (error) throw new Error("Booking could not be updated");

  // Aggiorniamo la cache
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  /* // For testing useOptimistic Hook
  await new Promise((res) => setTimeout(res, 4000));
  throw new Error("Not implemented"); */

  // Controlliamo se l'utente è loggato
  const session = await auth();
  if (!session)
    throw new Error("You must be signed in to delete a reservation");

  // Controlliamo se l'utente può cancellare la prenotazione
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You can only delete your own reservations.");

  // Aggiorniamo la tabella di supabase
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) throw new Error("Booking could not be deleted");

  // Aggiorniamo la cache
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
