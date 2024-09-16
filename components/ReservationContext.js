'use client'

import { createContext, useContext, useState } from 'react'


const initialState = { from: undefined, to: undefined }
const ReservationContext = createContext()


export function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState)
  const resetRange = () => setRange(initialState)

  return <ReservationContext.Provider value={{ range, setRange, resetRange }}>{children}</ReservationContext.Provider>
}

export function useReservation() {
  const context = useContext(ReservationContext)

  if (context === undefined) throw new Error("context used outside provider")

  return context
}