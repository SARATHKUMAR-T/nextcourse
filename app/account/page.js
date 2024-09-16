import { auth } from "../_lib/auth"

export const metadata = {
  title: "Account"
}

export default async function Page() {
  const session = await auth()
  return (
    <div>
      <h1 className="mb-7 font-semibold text-2xl text-accent-400">
        welcome {session.user.name} !!!
      </h1>
    </div>
  )
}