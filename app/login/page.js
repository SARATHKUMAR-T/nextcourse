import SignInButton from "@/components/SignInButton";
import { signIn } from "../_lib/auth";

export const metadata = {
  title: "Signin"
}
export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <form
        action={async (formData) => {
          "use server"
          await signIn("credentials", formData)
        }}
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
          </div>
          <div className="w-full flex items-center border  py-3  justify-center">
            <button >Sign In</button>
          </div>
        </div>
      </form>
      <SignInButton />
    </div>
  );
}
