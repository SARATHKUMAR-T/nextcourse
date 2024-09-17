"use server"

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase"
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";


export async function updateProfile(formData) {
  const session = await auth()
  if (!session) throw new Error("unauthourized !!!")

  const nationalID = formData.get('nationalID')
  const [nationality, countryFlag] = formData.get('nationality').split("%")

  // if (!/^[a-zA-Z0-9]{4-12}$/.test(nationalID)) throw new Error("Please provide an valid nationalID")

  const updateData = { nationalID, nationality, countryFlag }

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)

  revalidatePath('/account/profile')

  if (error) {
    throw new Error('Guest could not be updated');
  }

}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}


export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}

export async function deleteReservation(bookingId) {

  await new Promise((res) => setTimeout(res, 2000));

  const session = await auth()
  if (!session) throw new Error("unauthourized !!!")

  const guestBookings = await getBookings(session.user.guestId)

  const guestBookingIds = guestBookings.map((booking) => booking.id)

  if (!guestBookingIds.includes(bookingId)) throw new Error("you are not allowed to delete this booking.")

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    throw new Error('Booking could not be deleted');
  }

  revalidatePath('/account/reservations')
}



export async function updateBooking(formData) {
  const bookingId = Number(formData.get('bookingId'))
  const session = await auth()
  if (!session) throw new Error("unauthourized !!!")

  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingIds = guestBookings.map((booking) => booking.id)
  if (!guestBookingIds.includes(bookingId)) throw new Error("you are not allowed to update this booking.")

  const updateData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000)
  }


  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    throw new Error('Booking could not be updated');
  }

  revalidatePath('/account/reservations')
  revalidatePath(`/account/reservations/edit/${bookingId}`)

  redirect('/account/reservations')

}