'use client'
import { credentialsSignIn } from "@/app/_lib/actions";
import SignInButton from "@/components/SignInButton";
import SubmitButton from "@/components/SubmitButton";
import {useActionState} from 'react'

const initialState = {
  message: '',
} 
export default function SignInForm(){
  const [state, formAction] = useActionState(credentialsSignIn, initialState)
  return(
    <>
    <form
    action={formAction}
    >
    <div className="px-4 space-y-4 ">
      <div className="flex flex-col gap-3">
        <label>
          Email
        </label>
        <input name="email" type="email" />
      </div>
      <div className="flex flex-col gap-3 mb-6">
        <label>
          Password
        </label>
        <input name="password" type="password" />
        <p aria-live="polite">{state?.message}</p>
      </div>
      <div className="w-full flex items-center border  py-3  justify-center">
        <SubmitButton pendingLabel='signing in...' >Sign In</SubmitButton>
      </div>
    </div>
  </form>
  <SignInButton />
    </>
  )
}